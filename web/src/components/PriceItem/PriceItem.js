import { useMutation } from '@redwoodjs/web'

// Temporarily commented out until cart feat
// const MUTATION = gql`
// mutation AddToStripeCart($priceId: String) {
//   addToStripeCart(priceId: $priceId) {
//     items
//   }
// }`

export const PriceItem = ({
  id,
  nickname,
  product: { images, name, description },
}) => {
  // const [mutate] = useMutation(MUTATION)

  const onCartButtonClick = () => {
    // mutate({priceId: id})
    // handleAddToCart(id)
    // const cart = localStorage.getItem('items')
    // localStorage.setItem('items', ['dfdfgdfg', 'dfdfsfs'])
  }

  console.log('hi')
  return (
    <div className="price-item--card">
      <figure className="price-item__figure">
        <img alt={`A human using the ${name} superpower`} src={images[0]} />
        <figcaption>{name}</figcaption>
      </figure>
      <button onClick={onCartButtonClick}>Add to Cart</button>
    </div>
  )
}
