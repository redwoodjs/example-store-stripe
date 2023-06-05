import { useAuth } from 'src/auth'
import SuccessContent from 'src/components/SuccessContent'

export const QUERY = gql`
  query retrieveStripeCheckoutSessionQuery($id: ID!) {
    retrieveStripeCheckoutSession: retrieveStripeCheckoutSession(id: $id) {
      id
      customer
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ retrieveStripeCheckoutSession }) => {
  const { userMetadata } = useAuth()

  // Compares authentication data to session data to determine whether is logged in
  const isSignedUp = userMetadata === retrieveStripeCheckoutSession.customer
  return (
    <SuccessContent
      isSignedUp={isSignedUp}
      {...retrieveStripeCheckoutSession}
    />
  )
}
