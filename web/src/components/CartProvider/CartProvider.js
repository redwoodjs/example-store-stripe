import { createContext, useContext } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { assign } from '@xstate/immer'
import { useSelector } from '@xstate/react'
import { useInterpret } from '@xstate/react'
import { createMachine } from 'xstate'

import { useAuth } from '@redwoodjs/auth'
import { useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const cartMachine = createMachine(
  {
    id: 'cart',
    context: {
      cart: [],
    },
    initial: 'Restoring cart',
    states: {
      'Restoring cart': {
        invoke: {
          src: 'Restore cart',
        },
        on: {
          'Cart restored': {
            target: 'Shopping',
            actions: 'Restore cart',
          },
        },
      },
      Shopping: {
        on: {
          'Add to cart': {
            actions: ['Add to cart', () => toast.success('Added to cart')],
          },
          'Remove from cart': {
            actions: [
              'Remove from cart',
              () => toast.success('Removed from cart'),
            ],
          },
          'Clear cart': {
            actions: ['Clear cart', () => toast.success('Cleared cart')],
          },
          Checkout: 'Redirecting to Stripe Checkout',
        },
      },
      'Redirecting to Stripe Checkout': {
        invoke: {
          src: 'Redirect to Stripe Checkout',
        },
      },
    },
  },
  {
    actions: {
      'Restore cart': assign((context, event) => {
        context.cart = event.cart
      }),
      'Add to cart': assign((context, event) => {
        const item = context.cart.find((item) => item.id === event.item.id)

        if (item) {
          item.quantity += 1
        } else {
          context.cart.push({ ...event.item, quantity: 1 })
        }
      }),
      'Remove from cart': assign((context, event) => {
        const item = context.cart.find((item) => item.id === event.item.id)

        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          context.cart = context.cart.filter(
            (item) => item.id !== event.item.id
          )
        }
      }),
      'Clear cart': assign((context, _event) => {
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

  const { pathname } = useLocation()

  const cartService = useInterpret(
    cartMachine,
    {
      services: {
        'Restore cart': (_context, _event) => (send) => {
          let cart = JSON.parse(localStorage.getItem('cart')) ?? []

          // Clear the cart if they just checked out.
          if (pathname === '/success') {
            cart = []
          }

          send({
            type: 'Cart restored',
            cart,
          })
        },
        'Redirect to Stripe Checkout': (context, _event) => async () => {
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
            const customerId = currentUser.id
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
    },
    (state) => {
      localStorage.setItem('cart', JSON.stringify(state.context.cart))
    }
  )

  return (
    <CartContext.Provider value={{ cartService }}>
      {children}
    </CartContext.Provider>
  )
}

const determineCheckoutMode = (cart) => {
  const hasRecurring = cart.some((item) => item.type === 'recurring')
  return hasRecurring ? 'subscription' : 'payment'
}

// Hooks

const useCart = () => {
  const { cartService } = useContext(CartContext)
  const cart = useSelector(cartService, (state) => state.context.cart)
  return cart
}

const useAddToCart = () => {
  const { cartService } = useContext(CartContext)
  return (item) => {
    cartService.send({ type: 'Add to cart', item })
  }
}

const useCheckout = () => {
  const { cartService } = useContext(CartContext)
  return () => {
    cartService.send({ type: 'Checkout' })
  }
}

const useClearCart = () => {
  const { cartService } = useContext(CartContext)
  return () => cartService.send({ type: 'Clear cart' })
}

const useRemoveFromCart = () => {
  const { cartService } = useContext(CartContext)
  return (item) => cartService.send({ type: 'Remove from cart', item })
}

const useCanCheckout = () => {
  const { cartService } = useContext(CartContext)

  const isShopping = useSelector(cartService, (state) =>
    state.matches('Shopping')
  )

  const hasCartItems = useSelector(cartService, (state) =>
    Boolean(state.context.cart.length)
  )

  return isShopping && hasCartItems
}

// Exports

export default CartProvider

export {
  CartContext,
  useCart,
  useAddToCart,
  useCheckout,
  useClearCart,
  useCanCheckout,
  useRemoveFromCart,
}
