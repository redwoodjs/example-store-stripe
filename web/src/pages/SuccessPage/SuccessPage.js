import { MetaTags } from '@redwoodjs/web'
import { useParams } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

import CheckoutSuccessCell from 'src/components/CheckoutSuccessCell/CheckoutSuccessCell'

const SuccessPage = () => {
  const { isAuthenticated, currentUser } = useAuth()
  const { sessionId } = useParams()
  console.log('User is authenticated ', isAuthenticated)
  console.log('Current user is ', currentUser)
  return (
    <>
      <MetaTags
        title="Success"
        description="A sale has been successfully completed"
      />
      <CheckoutSuccessCell id={sessionId} />
    </>
  )
}

export default SuccessPage
