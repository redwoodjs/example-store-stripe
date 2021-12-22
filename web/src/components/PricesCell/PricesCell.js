import {PriceItem} from 'src/components/PriceItem/PriceItem'
import {List} from 'src/components/List/List'
import { array } from 'prop-types'

export const QUERY = gql`
  query ($priceType: StripePriceType){
    stripePricesVerbose (priceType: $priceType) {
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
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ stripePricesVerbose }) => {

  return (
    <List array={stripePricesVerbose} item={PriceItem}/>
  )
}
