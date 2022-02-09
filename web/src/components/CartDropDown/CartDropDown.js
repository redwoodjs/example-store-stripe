import { List } from '../List/List'
import { CartDropDownItem } from 'src/components/CartDropDownItem/CartDropDownItem'

import { useCheckout } from 'src/hooks/useCheckout.js'

export const CartDropDown = () => {
  const checkout = useCheckout()
  // const [mutate] = useMutation(MUTATION)
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
