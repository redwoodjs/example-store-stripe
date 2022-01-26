import { List } from '../List/List'
import { CartDropDownItem } from 'src/components/CartDropDownItem/CartDropDownItem'

export const CartDropDown = () => {
  const cartItems = [{ item: 'Invisibility' }, { item: 'Flight' }]

  const onCheckoutButtonClick = () => {}

  return (
    <div className="cart-drop-down">
      <List array={cartItems} item={CartDropDownItem} />
      <button onClick={onCheckoutButtonClick}>Checkout</button>
    </div>
  )
}
