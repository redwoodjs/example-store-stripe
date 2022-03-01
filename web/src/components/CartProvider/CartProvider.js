import { createMachine } from 'xstate'
import { assign } from '@xstate/immer'
import { useInterpret } from '@xstate/react'
import { toast } from '@redwoodjs/web/toast'
import { createContext, useContext } from 'react'
import { useSelector } from '@xstate/react'
import { useMutation } from '@redwoodjs/web'
import { loadStripe } from '@stripe/stripe-js'
import { useParams } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const cartMachine = createMachine(
  {
    id: 'cart',
    context: {
      cart: [],
    },
    initial: 'restoring',
    states: {
      restoring: {
        invoke: {
          src: 'restore',
        },
        on: {
          RESTORE: {
            target: 'shopping',
            actions: 'restoreCart',
          },
        },
      },
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
      restoreCart: assign((context, event) => {
        context.cart = event.cart
      }),
      addToCart: assign((context, event) => {
        const item = context.cart.find((item) => item.id === event.item.id)
        if (item) {
          item.quantity += 1
        } else {
          context.cart.push({ ...event.item, quantity: 1 })
        }
      }),
      removeFromCart: assign((context, event) => {
        const item = context.cart.find((item) => item.id === event.item.id)
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          context.cart = context.cart.filter(
            (item) => item.id !== event.item.id
          )
        }
      }),
      clearCart: assign((context, _event) => {
        context.cart = []
      }),
    },
  }
)

const CartContext = createContext({})

const CartProvider = ({ children }) => {
  const [checkout] = useMutation(
    gql`
      mutation Checkout(
        $mode: Mode!
        $cart: [ProductInput!]!
        $customerId: String
      ) {
        checkout(mode: $mode, cart: $cart, customerId: $customerId) {
          id
        }
      }
    `
  )

  const { currentUser, isAuthenticated } = useAuth()

  const params = useParams()

  const cartService = useInterpret(cartMachine, {
    services: {
      restore: (_context, _event) => (send) => {
        if (params?.success === 'true') {
          send({
            type: 'RESTORE',
            cart: [],
          })
          return
        }

        send({
          type: 'RESTORE',
          cart: JSON.parse(localStorage.getItem('cart')) ?? [],
        })
      },
      checkout: (context, _event) => async () => {
        // Dynamically determine checkoutMode based on cart contents
        const mode = determineCheckoutMode(context.cart)

        const checkoutPayload = {
          variables: {
            cart: context.cart.map((item) => ({ id: item.id, quantity: 1 })),
            mode: mode,
          },
        }

        // Get customerId from logged in users
        if (isAuthenticated) {
          const customerId = currentUser.customerId
          checkoutPayload.variables.customerId = customerId
        }

        // Create checkout session and return session id
        const {
          data: {
            checkout: { id },
          },
        } = await checkout(checkoutPayload)

        // Redirect user to Stripe Checkout page
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

const determineCheckoutMode = (cart) => {
  const hasRecurring =
    cart.filter((item) => item.type === 'recurring').length > 0
  return hasRecurring ? 'subscription' : 'payment'
}

const useCart = () => {
  const { cartService } = useContext(CartContext)
  const cart = useSelector(cartService, (state) => state.context.cart)
  return cart
}

const useAddToCart = () => {
  const { cartService } = useContext(CartContext)
  return (item) => {
    cartService.send({ type: 'ADD', item })
  }
}

const useCheckout = () => {
  const { cartService } = useContext(CartContext)
  return () => {
    cartService.send({ type: 'CHECKOUT' })
  }
}

const useClearCart = () => {
  const { cartService } = useContext(CartContext)
  return () => cartService.send({ type: 'CLEAR' })
}

const useCanCheckout = () => {
  const { cartService } = useContext(CartContext)

  const isShopping = useSelector(cartService, (state) =>
    state.matches('shopping')
  )

  const hasCartItems = useSelector(cartService, (state) =>
    Boolean(state.context.cart.length)
  )

  return isShopping && hasCartItems
}

export default CartProvider

export {
  CartContext,
  useCart,
  useAddToCart,
  useCheckout,
  useClearCart,
  useCanCheckout,
}
