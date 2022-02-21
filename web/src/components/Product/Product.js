import styled from 'styled-components'
import { useAddToCart } from 'src/components/CartProvider'

const Product = ({ name, description, price, priceId, images }) => {
  const addToCart = useAddToCart(priceId)

  const [image] = images

  return (
    <Wrapper>
      <Figure>
        <img alt={description} src={image} />
        <figcaption>{name}</figcaption>
      </Figure>
      <p>{price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </Wrapper>
  )
}

export default Product

// Styles

const Wrapper = styled.div`
  max-width: 250px;
`

const Figure = styled.figure`
  max-width: 100%;
  margin: 0;
  padding: 0.625em;
  background-color: aquamarine;

  & > img {
    width: 100%;
    max-width: 230px;
  }
`
