export const QUERY = gql`
  query ($priceType: StripePriceType){
    stripePricesVerbose (priceType: $priceType) {
      id
      nickname
      product {
        name
        id
        images
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
  console.log(stripePricesVerbose)
  return (
    <ul>
      {stripePricesVerbose.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
