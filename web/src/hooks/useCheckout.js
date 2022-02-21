import { loadStripe } from '@stripe/stripe-js'
import { useMutation } from '@redwoodjs/web'
import { useCart } from 'src/components/CartProvider'

export const useCheckout = (mode = 'payment') => {
  const cart = useCart()

  const [createCheckoutSession] = useMutation(
    gql`
      mutation Checkout($mode: Mode!, $cart: [ProductInput!]!) {
        checkout(mode: $mode, cart: $cart) {
          id
        }
      }
    `,
    {
      variables: {
        mode,
        cart,
      },
    }
  )

  return async () => {
    const {
      data: {
        checkout: { id },
      },
    } = await createCheckoutSession()

    const stripe = await loadStripe(process.env.STRIPE_PK)

    const result = await stripe.redirectToCheckout({
      sessionId: id,
    })

    if (result.error) {
      console.error(result.error.message)
    }
  }
}
