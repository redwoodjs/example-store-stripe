import { useStripeCart } from '@redwoodjs-stripe/web'
import styled from 'styled-components'

const Product = ({ id, name, description, price, images, type }) => {
  const { addToCart } = useStripeCart()
  const image = images[0]

  const onWrapperClick = () => {
    // Adds item to Stripe Cart
    addToCart({
      name: name,
      id: id,
      price: price,
      type: type,
    })
  }

  return (
    <Wrapper onClick={onWrapperClick}>
      <div style={{ overflow: 'hidden' }}>
        <Image alt={description} src={image} />
      </div>
      <ProductInfo>
        <Name>{name}</Name>
        <Price>
          {(price / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Price>
      </ProductInfo>
    </Wrapper>
  )
}

export default Product

// Styles

const Image = styled.img`
  height: var(--size-13);
  object-fit: contain;

  border-radius: var(--radius-2);
  background-color: var(--gray-1);

  transition: transform 500ms;
`

const Wrapper = styled.figure`
  &:hover {
    cursor: pointer;
  }

  &:hover ${Image} {
    transform: scale(1.125);
    transition: transform 200ms;
  }
`

const ProductInfo = styled.figcaption`
  margin-top: var(--size-2);
`

const Name = styled.p`
  font-size: var(--font-size-3);
  font-weight: var(--font-weight-6);
`

const Price = styled.span`
  color: var(--gray-6);
`
