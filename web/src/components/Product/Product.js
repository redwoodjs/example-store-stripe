import styled from 'styled-components'

const Product = ({ name, description, price, image }) => {
  return (
    <article>
      <Wrapper>
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
