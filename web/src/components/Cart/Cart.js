import { useState } from 'react'
import styled, { css } from 'styled-components'

import CartDropDown from 'src/components/CartDropDown'
import Button from 'src/components/Button'

import { useCart } from 'src/components/CartProvider'

const Cart = () => {
  const [isVisible, setVisibility] = useState(false)
  const cart = useCart()

  const toggleVisibility = () => setVisibility(!isVisible)
  const getCartQuantity = () => {
    if (cart.length > 0) {
      const length = cart.reduce((total, item) => {
        return total + item.quantity
      }, 0)
      return length
    }
    return 0
  }

  const quantity = getCartQuantity()

  return (
    <>
      <IndicatorButton
        onClick={toggleVisibility}
        icon="shoppingCart"
        active={isVisible}
        data-quantity={quantity}
      />
      {isVisible && <CartDropDown toggleVisibility={toggleVisibility} />}
    </>
  )
}

export default Cart

/* Styles */

const IndicatorButton = styled(Button)`
  position: relative;

  svg {
    stroke: var(--primary);
  }

    &:after {
      content: attr(data-quantity);
      display: block;
      position: absolute;
      top: -0.1em;
      right: -0.1em;
      padding: 0 0.4em;
      border-radius: 1em;
      font-size: var(--font-size-0);
      background: var(--primary);
      color: var(--white);

`
