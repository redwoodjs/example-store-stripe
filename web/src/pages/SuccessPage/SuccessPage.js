import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import CheckoutSuccessCell from 'src/components/CheckoutSuccessCell/CheckoutSuccessCell'

const SuccessPage = () => {
  const { sessionId } = useParams()

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
