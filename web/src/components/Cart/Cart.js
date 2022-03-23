import { useState } from 'react'

import CartDropDown from 'src/components/CartDropDown'
import Button from 'src/components/Button'

const Cart = () => {
  const [isVisible, setVisibility] = useState(false)

  const toggleVisibility = () => setVisibility(!isVisible)

  return (
    <>
      <Button
        onClick={toggleVisibility}
        icon="shoppingCart"
        active={isVisible}
      />
      {isVisible && <CartDropDown toggleVisibility={toggleVisibility} />}
    </>
  )
}

export default Cart
