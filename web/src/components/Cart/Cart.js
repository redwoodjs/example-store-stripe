import { useState } from 'react'

import CartDropDown from 'src/components/CartDropDown'

const Cart = () => {
  const [isVisible, setVisibility] = useState(false)
  const onCartButtonClick = () => {
    setVisibility(!isVisible)
  }

  return (
    <>
      <button onClick={onCartButtonClick}>Cart</button>
      {isVisible && <CartDropDown />}
    </>
  )
}

export default Cart
