import { useState } from 'react'
import styled from 'styled-components'
import { ShoppingCart } from 'react-feather'

import CartDropDown from 'src/components/CartDropDown'
import Button from 'src/components/Button'

import { useCart } from 'src/components/CartProvider'

const Cart = (props) => {
  const [isVisible, setVisibility] = useState(false)

  const toggleVisibility = () => setVisibility(!isVisible)

  const cart = useCart()

  const getCartQuantity = () => {
    if (!cart.length) {
      return ''
    }

    return cart.reduce((total, item) => {
      return total + item.quantity
    }, 0)
  }

  const quantity = getCartQuantity()

  return (
    <div style={{ position: 'relative' }}>
      <ShoppingCartButton
        variant="transparent"
        onClick={toggleVisibility}
        active={isVisible}
        data-quantity={quantity}
        {...props}
      >
        <StyledShoppingCart />
      </ShoppingCartButton>
      {isVisible && <CartDropDown toggleVisibility={toggleVisibility} />}
    </div>
  )
}

export default Cart

/* Styles */

const ShoppingCartButton = styled(Button)`
  &:after {
    content: attr(data-quantity);

    position: absolute;
    top: -4px;
    right: 2px;

    font-size: var(--font-size-0);

    color: var(--gray-0);
    background-color: var(--primary);

    padding: 0 calc(var(--size-1) * 1.25);
    border-radius: var(--radius-round);

    border: var(--border-size-2) solid var(--gray-0);
  }
`

const StyledShoppingCart = styled(ShoppingCart)`
  transform: translateX(-2px);

  color: var(--primary);
`
