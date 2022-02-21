import styled from 'styled-components'

import { useCart } from 'src/components/CartProvider'
import List from 'src/components/List'
import { useCheckout } from 'src/hooks/useCheckout.js'

const CartDropDown = () => {
  const cart = useCart()
  const checkout = useCheckout()

  return (
    <Wrapper>
      <List
        array={cart}
        item={({ item }) => <div>{JSON.stringify(item)}</div>}
      />
      <button onClick={checkout}>Checkout</button>
    </Wrapper>
  )
}

export default CartDropDown

// Styles

const Wrapper = styled.div`
  position: absolute;
  right: 0%;
  border: black 1px solid;
  padding: 0 1.2rem;
  padding-bottom: 0.625rem;
  background-color: #fafafa;
  z-index: 300000000000000;
`
