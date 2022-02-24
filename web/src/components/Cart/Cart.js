import styled from 'styled-components'
import { useState } from 'react'
import { ShoppingCart } from 'react-feather'

import CartDropDown from 'src/components/CartDropDown'

const Cart = () => {
  const [isVisible, setVisibility] = useState(false)

  const toggleVisibility = () => setVisibility(!isVisible)

  return (
    <>
      <Button onClick={toggleVisibility}>
        <ShoppingCart />
        {isVisible && <CartDropDown />}
      </Button>
    </>
  )
}

export default Cart

// Styles

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`
