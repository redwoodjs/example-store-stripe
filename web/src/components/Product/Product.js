import styled from 'styled-components'
import { useAddToCart } from 'src/components/CartProvider'
import { usePortal } from 'src/components/PortalProvider'

import Button from 'src/components/Button'

const Product = ({ id, name, description = ' ', price, image, type }) => {
  const addToCart = useAddToCart()
  const Modal = usePortal()

  const displayOverview = () => {}

  return (
    <article>
      <Wrapper>
        <Modal>
          <h3>Hellooooo!</h3>
        </Modal>
        <Image alt={description} src={image} />
        <Row>
          <Info>
            <Name>{name}</Name>
            <Price>
              {(price / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </Price>
          </Info>
          <Button
            onClick={() =>
              addToCart({ id, name, description, price, image, type })
            }
            icon="shoppingCart"
          >
            +
          </Button>
          <Button onClick={() => displayOverview()} icon="shoppingCart">
            +
          </Button>
        </Row>
      </Wrapper>
    </article>
  )
}

export default Product

// Styles

const Wrapper = styled.figure`
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
`

const Image = styled.img`
  height: var(--size-13);
  object-fit: contain;

  border-radius: var(--radius-2);
  background-color: var(--gray-1);
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Info = styled.figcaption`
  display: flex;
  flex-direction: column;
`

const Name = styled.p`
  font-size: var(--font-size-3);
  font-weight: var(--font-weight-6);
`

const Price = styled.span`
  color: var(--gray-6);
`
