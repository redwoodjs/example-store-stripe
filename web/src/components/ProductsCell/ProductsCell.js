import List from 'src/components/List'
import Product from 'src/components/Product'

export const QUERY = gql`
  query Products($type: ProductType) {
    products(type: $type) {
      id
      name
      description
      images
      price
      type
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}> Error: {error.stack}</div>
)

export const Success = ({ products }) => {
  return <List array={products} item={Product} />
}
