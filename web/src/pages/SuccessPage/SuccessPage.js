import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useStripe } from 'src/components/CartProvider'
import CheckoutSuccessCell from 'src/components/CheckoutSuccessCell'

const SuccessPage = () => {
  const { sessionId } = useParams()
  const stripe = useStripe()

  console.log(stripe)

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
