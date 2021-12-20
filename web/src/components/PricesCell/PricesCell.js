export const QUERY = gql`
  query ($priceType: String){
    stripePrices (priceType: $priceType) {
      id
      nickname
      product
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ stripePrices }) => {
  console.log(stripePrices)
  return (
    <ul>
      {stripePrices.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
