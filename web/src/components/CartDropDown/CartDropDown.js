import { List } from '../List/List'
import { CartDropDownItem } from 'src/components/CartDropDownItem/CartDropDownItem'

import { loadStripe } from '@stripe/stripe-js'
import { useMutation } from '@redwoodjs/web'

const checkoutMode = 'payment'
export const CartDropDown = () => {
  // const [mutate] = useMutation(MUTATION)
  const cartItems = [{ item: 'Invisibility' }, { item: 'Flight' }]

  const [createCheckoutSession] = useMutation(
    gql`
      mutation CreateCheckoutSession($mode: String!) {
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

  const onCheckoutButtonClick = async () => {
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

  return (
    <div className="cart-drop-down">
      <List array={cartItems} item={CartDropDownItem} />
      <button onClick={onCheckoutButtonClick}>Checkout</button>
    </div>
  )
}

const useCheckout = () => {}
