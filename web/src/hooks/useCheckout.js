import { loadStripe } from '@stripe/stripe-js'
import { useMutation } from '@redwoodjs/web'

export const useCheckout = (checkoutMode = 'payment') => {
  const [createCheckoutSession] = useMutation(
    gql`
      mutation CreateCheckoutSession($mode: StripeMode!) {
        createCheckoutSession(mode: $mode) {
          id
        }
      }
    `,
    {
      variables: {
        mode: checkoutMode,
      },
    }
  )

  return async () => {
    // Creates new checkout session dependent on "checkoutMode".
    const {
      data: {
        createCheckoutSession: { id },
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
