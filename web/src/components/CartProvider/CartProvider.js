import { createMachine, assign } from 'xstate'
import { useInterpret } from '@xstate/react'
import { toast } from '@redwoodjs/web/toast'
import { createContext, useContext } from 'react'
import { useSelector } from '@xstate/react'
import { useMutation } from '@redwoodjs/web'
import { loadStripe } from '@stripe/stripe-js'

const cartMachine = createMachine(
  {
    id: 'cart',
    context: {
      cart: [],
    },
    initial: 'shopping',
    states: {
      shopping: {
        on: {
          ADD: {
            actions: ['addToCart', () => toast.success('Added to cart')],
          },
          REMOVE: {
            actions: [
              'removeFromCart',
              () => toast.success('Removed from cart'),
            ],
          },
          CLEAR: {
            actions: ['clearCart', () => toast.success('Cleared cart')],
          },
          CHECKOUT: 'redirecting',
        },
      },
      redirecting: {
        invoke: {
          src: 'checkout',
        },
      },
    },
  },
  {
    actions: {
      addToCart: assign((context, event) => ({
        cart: [...context.cart, event.item],
      })),
      removeFromCart: assign((context, event) => ({
        cart: context.cart.filter((item) => item.id !== event.item.id),
      })),
      clearCart: assign((_context, _event) => ({
        cart: [],
      })),
    },
  }
)

const CartContext = createContext({})

const CartProvider = ({ children }) => {
  const [checkout] = useMutation(
    gql`
      mutation Checkout($mode: Mode!, $cart: [ProductInput!]!) {
        checkout(mode: $mode, cart: $cart) {
          id
        }
      }
    `
  )

  const cartService = useInterpret(cartMachine, {
    services: {
      checkout: (context, _event) => async () => {
        const {
          data: {
            checkout: { id },
          },
        } = await checkout({
          variables: {
            cart: context.cart.map((item) => ({ id: item.id, quantity: 1 })),
            mode: 'payment',
          },
        })

        const stripe = await loadStripe(process.env.STRIPE_PK)

        await stripe.redirectToCheckout({
          sessionId: id,
        })
      },
    },
  })

  cartService.onTransition((state) => {
    localStorage.setItem('cart', JSON.stringify(state.context.cart))
  })

  return (
    <CartContext.Provider value={{ cartService }}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const { cartService } = useContext(CartContext)
  const cart = useSelector(cartService, (state) => state.context.cart)
  return cart
}

const useAddToCart = () => {
  const { cartService } = useContext(CartContext)
  return (item) => {
    cartService.send('ADD', { item })
  }
}

const useCheckout = () => {
  const { cartService } = useContext(CartContext)
  return () => {
    cartService.send('CHECKOUT')
  }
}

const useClearCart = () => {
  const { cartService } = useContext(CartContext)
  return () => cartService.send('CLEAR')
}

export default CartProvider

export { CartContext, useCart, useAddToCart, useCheckout, useClearCart }
