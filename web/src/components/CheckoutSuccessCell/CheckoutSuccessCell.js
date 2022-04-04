import SuccessContent from 'src/components/SuccessContent'

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
  return <SuccessContent {...getSession} />
}
