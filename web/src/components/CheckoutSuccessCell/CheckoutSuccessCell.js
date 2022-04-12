import SuccessContent from 'src/components/SuccessContent'

export const QUERY = gql`
  query CheckoutSession($id: ID!) {
    checkoutSession: getCheckoutSession(id: $id) {
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

export const Success = ({ checkoutSession }) => {
  return <SuccessContent {...checkoutSession} />
}
