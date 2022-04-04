import Shield from 'src/components/Shield/shield.svg'

export const QUERY = gql`
  query getSuccessQuery($id: ID!) {
    getSession: getSession(id: $id) {
      id
      customerId
      customerName
      customerSignedUp
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ getSession }) => {
  return (
    <div>
      <h1>Thank you {getSession.customerName} for your purchase</h1>
      <p>Have a SUPER day!</p>
      <Shield />
      {!getSession.customerSignedUp && <p>Go sign the fuck up</p>}
    </div>
  )
}
