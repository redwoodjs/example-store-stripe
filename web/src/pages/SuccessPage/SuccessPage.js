import { useEffect } from 'react'

import { useStripeCart } from '@redwoodjs-stripe/web'

import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import CheckoutSuccessCell from 'src/components/CheckoutSuccessCell/CheckoutSuccessCell'

const SuccessPage = () => {
  const { clearCart, cart } = useStripeCart()
  const { sessionId } = useParams()

  // OnMount clear the cart contents
  useEffect(() => {
    if (cart.length > 0) {
      clearCart()
    }
  }, [clearCart, cart])

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
