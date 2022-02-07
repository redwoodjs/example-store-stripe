import { List } from '../List/List'
import { CartDropDownItem } from 'src/components/CartDropDownItem/CartDropDownItem'

import { useMutation } from '@redwoodjs/web'

const MUTATION = gql``

export const CartDropDown = () => {
  const [mutate] = useMutation(MUTATION)
  const cartItems = [{ item: 'Invisibility' }, { item: 'Flight' }]

  const onCheckoutButtonClick = () => {
    mutate({})
  }

  return (
    <div className="cart-drop-down">
      <List array={cartItems} item={CartDropDownItem} />
      <button onClick={onCheckoutButtonClick}>Checkout</button>
    </div>
  )
}
