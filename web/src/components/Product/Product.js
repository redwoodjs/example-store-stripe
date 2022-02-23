import styled from 'styled-components'
import { useAddToCart } from 'src/components/CartProvider'

const Product = ({ id, name, description, price, image }) => {
  const addToCart = useAddToCart()

  return (
    <article>
      <Wrapper
        onClick={() => addToCart({ id, name, description, price, image })}
      >
        <Image alt={description} src={image} />
        <Info>
          <Name>{name}</Name>
          <Description>{description}</Description>
          <Price>{price}</Price>
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
  height: var(--size-12);

  object-fit: cover;

  border-radius: var(--radius-2);
`

const Info = styled.figcaption`
  display: flex;
  flex-direction: column;
`

const Name = styled.p`
  font-weight: var(--font-weight-6);
`

const Description = styled.p`
  color: var(--gray-6);
`

const Price = styled.span`
  color: var(--gray-6);

  &::before {
    content: '$';
  }
`
