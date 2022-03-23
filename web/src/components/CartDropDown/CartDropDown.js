import styled from 'styled-components'

import List from 'src/components/List'
import Button from 'src/components/Button'
import {
  useCart,
  useCheckout,
  useClearCart,
  useCanCheckout,
} from 'src/components/CartProvider'

const CartDropDown = ({ toggleVisibility }) => {
  const cart = useCart()
  const checkout = useCheckout()
  const clearCart = useClearCart()
  const canCheckout = useCanCheckout()

  return (
    <Wrapper onClick={toggleVisibility}>
      <List items={cart} Component={CartItem} direction={'column'} />
      {!canCheckout && <CenteredText>Your cart is empty</CenteredText>}
      <Row>
        <Button variant="primary" onClick={checkout} disabled={!canCheckout}>
          Checkout
        </Button>
        <Button variant="secondary" onClick={clearCart}>
          Clear
        </Button>
      </Row>
    </Wrapper>
  )
}

export default CartDropDown

const CartItem = ({ image, quantity, name }) => {
  return (
    <Row>
      <CartImage src={image} />
      <p>{name}</p>
      <Quantity>{quantity}</Quantity>
    </Row>
  )
}

// Styles

const Wrapper = styled.div`
  position: absolute;
  top: 100%;

  background: var(--white);
  border-radius: var(--radius-2);
  box-shadow: var(--shadow-4);

  padding: var(--padding);

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: var(--padding);
`

const Row = styled.div`
  display: flex;
  align-items: center;

  gap: var(--size-2);
`

const CenteredText = styled.p`
  text-align: center;
`

const CartImage = styled.img`
  height: var(--size-7);

  border-radius: var(--radius-2);
`

const Quantity = styled.span`
  &::before {
    content: 'x ';
  }
`
