import { createContext, useContext } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import type { Stripe } from '@stripe/stripe-js'
import { assign } from '@xstate/immer'
import { useSelector } from '@xstate/react'
import { useInterpret } from '@xstate/react'
import { createMachine } from 'xstate'
import type { ActorRefFrom } from 'xstate'

import { useAuth } from '@redwoodjs/auth'
import { useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

// ------------------------
// Types
// ------------------------

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  type: 'one_time' | 'recurring'
  quantity: number
}

type Cart = Array<CartItem>

type CheckoutMode = 'subscription' | 'payment'

// ------------------------
// Machine definition
// ------------------------

// Install the XState VSCode extension and open the visual editor!
const cartMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGECGAnALgOgDIHtUIBLAOymwCU5N90yoACAYw0wGI0tH0a7JEoAA75YxTMXylBIAB6IAtAGYArAEZsADiUAWAAxK1agEwBOYwbU6ANCACeiY5uxq9Adh1u9egGw6Vbio6SpoAvqG2XDgERAx4hCTkjLCY9EJg7ADKqcTpjAA2CQJIICJiElIy8gjKKirYKsZqjW4+xm5qmiqmKrYOCMb6Lu5BTkpKrUrGSuGRbPGx5OwQUmDYKaiYa1ELiVAyZeKS0iXVCj5KWnqmboMq2mpumnqafY4d2D7unqY+zSqGYwqWYgHaZAAW+CEQgY7AAghAIIxaCw2AdREdKqdHOZsF5TJ4pnoLJ1NDZ7IgAhoQqYbhNND4OqYZhFQfMIVCYUtqABbfAANzAjAAZuh8DzUVh0eVjlVEJ1TNgzN1fKZNE83D0fG8EEoCdgJjpPJYTG0CSCwZDobDkPkwBhJZhpZiTqBqu0fNgfkpfEadFZNGptRSak8DeYdJpNO0VL6Ahb2VauVBOOCwMwANb4ACuTpKhwqrrkil0ega6nMz3MeoJOs1itcgSmdXUzR04VZpHwEDgMh2MT2VD49CSrCl+YxhblNT1xmwBN0VkZPWjbh1JjLjcj0ZUPnVgzUCawuziA4YyRy6WdU+xM9MGjVFzcmo6mmZwf64znjd3rmMXy+Q9WX7BIGGvWVbwUf1PQXf0dGXe52h1KCdC0cxGh8TCXiMIx22AxNOTAicZSxN1FGcAxzG8H1MJ0AlfB1M0XDcGkOiNQIASPHBqBIXhmAkJIUWYNNMxzPNhEnCCyJqJpnBVNVWkDC41FMOtGU+EZrguJwmmMLjwNI4saiNMtYKXTVELXEMFGaakI1MXwuiCWcO1CIA */
  createMachine(
    {
      context: { cart: [], stripe: undefined },
      tsTypes: {} as import('./CartProvider.typegen').Typegen0,
      schema: {
        context: {} as {
          cart: Cart
          stripe: Stripe
        },
        events: {} as
          | {
              type: 'Cart restored'
              cart: Cart
            }
          | {
              type: 'Stripe loaded'
              stripe: Stripe
            }
          | {
              type: 'Add to cart'
              item: CartItem
            }
          | {
              type: 'Remove from cart'
              item: CartItem
            }
          | {
              type: 'Clear cart'
            }
          | {
              type: 'Checkout'
            },
      },
      id: 'Cart',
      initial: 'Loading',
      states: {
        Loading: {
          type: 'parallel',
          states: {
            'Restoring cart': {
              initial: 'Restoring cart',
              states: {
                'Restoring cart': {
                  invoke: {
                    src: 'Restore cart',
                  },
                  on: {
                    'Cart restored': {
                      actions: 'Restore cart',
                      target: 'Done',
                    },
                  },
                },
                Done: {
                  type: 'final',
                },
              },
            },
            'Loading stripe': {
              initial: 'Loading stripe',
              states: {
                'Loading stripe': {
                  invoke: {
                    src: 'Load stripe',
                  },
                  on: {
                    'Stripe loaded': {
                      actions: 'Assign stripe',
                      target: 'Done',
                    },
                  },
                },
                Done: {
                  type: 'final',
                },
              },
            },
          },
          onDone: {
            target: 'Shopping',
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
            Checkout: {
              target: 'Redirecting to checkout',
            },
          },
        },
        'Redirecting to checkout': {
          invoke: {
            src: 'Redirect to checkout',
          },
        },
      },
    },
    {
      actions: {
        'Restore cart': assign((context, event) => {
          context.cart = event.cart
        }),
        'Assign stripe': assign((context, event) => {
          context.stripe = event.stripe
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
      services: {
        'Load stripe': (_context, _event) => async (send) => {
          const stripe = await loadStripe(process.env.STRIPE_PK)

          send({
            type: 'Stripe loaded',
            stripe,
          })
        },
      },
    }
  )

// ------------------------
// Context
// ------------------------

// See https://dev.to/mpocock1/how-to-manage-global-state-with-xstate-and-react-3if5
const CartContext = createContext(
  {} as {
    cartService: ActorRefFrom<typeof cartMachine>
  }
)

const CartProvider = ({ children }) => {
  const [createCheckoutSession] = useMutation(
    gql`
      mutation CreateCheckoutSession(
        $mode: Mode!
        $cart: [CartItem!]!
        $customerId: ID
      ) {
        createCheckoutSession(
          mode: $mode
          cart: $cart
          customerId: $customerId
        ) {
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
        'Redirect to checkout': (context, _event) => async () => {
          // Determine the checkout mode based on the cart's items.
          const mode = determineCheckoutMode(context.cart)

          const payload = {
            variables: {
              cart: context.cart.map((item) => ({ id: item.id, quantity: 1 })),
              mode,
              // If they're logged in, get `customerId` from `currentUser`
              ...(isAuthenticated && { customerId: currentUser.id }),
            },
          }

          // Create a checkout session and get the session's id
          const {
            data: {
              createCheckoutSession: { id },
            },
          } = await createCheckoutSession(payload)

          // Redirect the user to the checkout page.
          await context.stripe.redirectToCheckout({
            sessionId: id,
          })
        },
      },
    },
    // Save the cart to local storage
    (state) => {
      localStorage.setItem('cart', JSON.stringify(state.context.cart))
    }
  )

  console.log(cartService.state)

  return (
    <CartContext.Provider value={{ cartService }}>
      {children}
    </CartContext.Provider>
  )
}

const determineCheckoutMode = (cart: Cart): CheckoutMode => {
  const hasRecurring = cart.some((item) => item.type === 'recurring')
  return hasRecurring ? 'subscription' : 'payment'
}

// ------------------------
// Hooks
// ------------------------

const useStripe = () => {
  const { cartService } = useContext(CartContext)
  const stripe = useSelector(cartService, (state) => state.context.stripe)
  return stripe
}

const useCart = () => {
  const { cartService } = useContext(CartContext)
  const cart = useSelector(cartService, (state) => state.context.cart)
  return cart
}

const useAddToCart = () => {
  const { cartService } = useContext(CartContext)
  return (item: CartItem) => {
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

// ------------------------
// Exports
// ------------------------

export default CartProvider

export {
  CartContext,
  useStripe,
  useCart,
  useAddToCart,
  useCheckout,
  useClearCart,
  useCanCheckout,
}
