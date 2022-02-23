import styled from 'styled-components'

import List from 'src/components/List'
import { useCart, useCheckout, useClearCart } from 'src/components/CartProvider'

const CartDropDown = () => {
  const cart = useCart()
  const checkout = useCheckout()
  const clearCart = useClearCart()

  return (
    <Wrapper>
      <List items={cart} Component={CartItem} direction={'column'} />
      <button onClick={checkout}>Checkout</button>
      <button onClick={clearCart}>Clear</button>
    </Wrapper>
  )
}

const CartItem = ({ image }) => {
  return (
    <Row>
      <CartImage src={image} />
      <Quantity>1</Quantity>
    </Row>
  )
}

export default CartDropDown

// Styles

const Wrapper = styled.div`
  position: absolute;
  margin-top: var(--size-3);

  background-color: var(--gray-1);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-3);

  padding: var(--size-3);

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--size-3);
`

const Row = styled.div`
  display: flex;
  align-items: center;

  gap: var(--size-2);
`

const CartImage = styled.img`
  height: var(--size-8);

  border-radius: var(--radius-2);
`

const Quantity = styled.span`
  &::before {
    content: 'x ';
  }
`
