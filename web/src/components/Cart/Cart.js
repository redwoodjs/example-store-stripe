import * as Dialog from '@radix-ui/react-dialog'
import { ShoppingCart, Trash2 } from 'react-feather'
import styled, { css } from 'styled-components'

import Button from 'src/components/Button'
import {
  useCart,
  useCheckout,
  useClearCart,
  useCanCheckout,
  useRemoveFromCart,
} from 'src/components/CartProvider'

const Cart = (props) => {
  const cart = useCart()

  const quantity = cart.reduce((total, item) => total + item.quantity, 0)

  const canCheckout = useCanCheckout()
  const checkout = useCheckout()
  const clearCart = useClearCart()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ShoppingCartButton
          aria-label="Open cart"
          variant="icon"
          data-quantity={quantity}
          {...props}
        >
          <ShoppingCart style={{ transform: 'translateX(-2px)' }} />
        </ShoppingCartButton>
      </Dialog.Trigger>

      <Content>
        {cart.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        {!canCheckout && <CenteredText>Your cart is empty</CenteredText>}
        <Row style={{ '--gap': 'var(--size-1)' }}>
          <Button onClick={checkout} disabled={!canCheckout}>
            Checkout
          </Button>
          <Button variant="secondary" onClick={clearCart}>
            Clear
          </Button>
        </Row>
      </Content>
    </Dialog.Root>
  )
}

export default Cart

// Styles

const ShoppingCartButton = styled(Button)`
  &[data-state='open'] {
    background-color: var(--gray-3);

    &:hover {
      background-color: var(--gray-4);
      transition: background-color 200ms;
    }
  }

  /*
    We only want to apply styles to the after pseudo-element if there's cart items.
    Maybe there's an easier way.
  */
  ${(props) =>
    props['data-quantity'] &&
    css`
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

        /*
          For when it overlaps with the cart a little.
        */
        border: var(--border-size-2) solid var(--gray-0);
      }
    `}
`

const CartItem = ({ image, quantity, name, id }) => {
  const removeFromCart = useRemoveFromCart()
  return (
    <Row style={{ width: '100%' }}>
      <Quantity>{quantity}</Quantity>
      <CartImage src={image} />
      <p style={{ fontSize: 'calc(var(--font-size-1) / 1.125)' }}>{name}</p>
      <Button
        aria-label={`Remove ${name} from cart`}
        variant="icon"
        onClick={() => removeFromCart({ id })}
        style={{ marginLeft: 'auto' }}
      >
        <Trash2 style={{ width: 'var(--size-4)' }} />
      </Button>
    </Row>
  )
}

const Content = styled(Dialog.Content)`
  position: absolute;

  top: var(--size-10);
  right: 0px;

  /*
    Not great.
  */
  z-index: 1;

  background-color: var(--white);
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

  gap: var(--gap);
`

const CenteredText = styled.p`
  text-align: center;
`

const CartImage = styled.img`
  margin-right: var(--size-2);

  height: var(--size-7);

  border-radius: var(--radius-2);
`

const Quantity = styled.p`
  flex-shrink: 0;

  margin-right: var(--size-1);

  color: var(--gray-6);
  font-size: var(--font-size-0);

  &::after {
    content: ' x';
  }
`
