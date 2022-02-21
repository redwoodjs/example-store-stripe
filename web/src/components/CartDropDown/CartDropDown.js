import List from 'src/components/List'
import CartDropDownItem from 'src/components/CartDropDownItem'

import { useCheckout } from 'src/hooks/useCheckout.js'

const CartDropDown = () => {
  // Uses graphQL mutation to redirect to Stripe checkout
  const checkout = useCheckout()
  const cartItems = [{ item: 'Invisibility' }, { item: 'Flight' }]

  const onCheckoutButtonClick = async () => {
    await checkout()
  }

  return (
    <div className="cart-drop-down">
      <List array={cartItems} item={CartDropDownItem} />
      <button onClick={onCheckoutButtonClick}>Checkout</button>
    </div>
  )
}

export default CartDropDown
