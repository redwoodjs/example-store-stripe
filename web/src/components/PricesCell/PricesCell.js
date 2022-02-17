import PriceItem from 'src/components/PriceItem'
import List from 'src/components/List'
// import { array } from 'prop-types'

export const QUERY = gql`
  query stripePricesVerbose($priceType: StripePriceType) {
    stripePricesVerbose(priceType: $priceType) {
      id
      nickname
      product {
        name
        id
        images
        description
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}> Error: {error.stack}</div>
)

export const Success = ({ stripePricesVerbose }) => {
  return <List array={stripePricesVerbose} item={PriceItem} />
}
