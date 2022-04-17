import styled from 'styled-components'

import { useAddToCart } from 'src/components/CartProvider'

const Product = ({ id, name, description = ' ', price, image, type }) => {
  const addToCart = useAddToCart()
  return (
    <article>
      <Wrapper
        onClick={() => addToCart({ id, name, description, price, image, type })}
      >
        <Image alt={description} src={image} />
        <Info>
          <Name>{name}</Name>
          <Price>
            {(price / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </Price>
        </Info>
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

  &:hover {
    cursor: pointer;
  }
`

const Image = styled.img`
  height: var(--size-13);
  object-fit: contain;

  border-radius: var(--radius-2);
  background-color: var(--gray-1);
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
