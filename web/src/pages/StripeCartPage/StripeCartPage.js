import { MetaTags } from '@redwoodjs/web'
import React from 'react'
import { useParams } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const StripeCartPage = () => {
  const [sessionData, setSessionData] = useState({})
  const { success, sessionId } = useParams()

  // checkoutMode is determined by the checkout generator command. It can either be "payment" or "subscription"
  // Neccesary for creating a checkout session
  const checkoutMode = 'payment'

  const onCheckoutButtonClick = () => {
    // Creates new checkout session dependent on "checkoutMode".
    handleCheckoutSessionCreation(checkoutMode)
  }

  const onCustomerPortalButtonClick = () => {
    // Sends customer id to serverless function
    handleCustomerPortalSessionCreation(sessionData.customer)
  }

  useEffect(() => {
    const fetchSessionData = async () => {
      if (success === 'true') {
        // Retrieves checkout session data using session id in params
        const newSessionData = await retrieveCheckoutSession(sessionId)
        setSessionData(newSessionData)
        console.log(newSessionData)
      }
    }
    fetchSessionData()
  }, [success, sessionId])

  return (
    <>
      <MetaTags
        title="Stripe Cart"
        description="A cart page for trying out the Stripe checkout"
      />

      <h2>Stripe Cart</h2>
      <p>Click the checkout button below to try out the Stripe Checkout</p>
      <ul className="cart-drop-down__list list--no-style">
        <li className="cart-drop-down__list__item">Item 1</li>
        <li className="cart-drop-down__list__item">Item 2</li>
      </ul>
      <button onClick={onCheckoutButtonClick}>Checkout</button>

      {success && checkoutMode === 'subscription' && (
        <>
          <h3>Customer Portal</h3>
          <p>To change Subscription settings click the button below</p>
          <button onClick={onCustomerPortalButtonClick}>Customer Portal</button>
        </>
      )}
    </>
  )
}

export default StripeCartPage

/**
 * This is a hack. There should be a better way.
 */
const getApiUrl = () =>
  window.RWJS_API_GRAPHQL_URL.split('/').slice(0, -1).join('/')

const retrieveCheckoutSession = async (id) => {
  const response = await window.fetch(
    `${getApiUrl()}/retrieveCheckoutSession`,
    {
      method: 'POST',
      body: JSON.stringify({ id: id }),
    }
  )
  return response.json()
}

const handleCheckoutSessionCreation = async (mode) => {
  const stripey = await loadStripe(process.env.STRIPE_PK)
  const response = await fetch(`${getApiUrl()}/createCheckoutSession`, {
    method: 'POST',
    body: JSON.stringify({ mode: mode }),
  })

  const session = await response.json()

  const result = await stripey.redirectToCheckout({
    sessionId: session.id,
  })
  if (result.error) {
    console.log(result.error.message)
  }
}

// TODO: remove customer id after creating wway to save session info
const handleCustomerPortalSessionCreation = async (customer) => {
  const response = await window.fetch(
    `${getApiUrl()}/createCustomerPortalSession`,
    {
      method: 'POST',
      body: JSON.stringify({ customer: customer }),
    }
  )

  const session = await response.json()
  window.location.href = session.url

  if (session.error) {
    console.log(session.error.message)
  }
}
