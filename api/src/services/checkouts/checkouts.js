import { db } from 'src/lib/db'
import { stripe } from 'src/lib/stripe'

/**
 * @param {{
 *   mode: 'payment' | 'subscription'
 *   cart: Array<{ id: string, quantity: number }>
 *   customerId?: string
 * }}
 *
 * @returns {import('stripe').Stripe.Checkout.Session}
 */
export const createCheckoutSession = async ({ mode, cart, customerId }) => {
  // eslint-disable-next-line camelcase
  const line_items = cart.map((product) => ({
    price: product.id,
    quantity: product.quantity,
  }))

  return stripe.checkout.sessions.create({
    // See https://stripe.com/docs/payments/checkout/custom-success-page#modify-success-url.
    success_url: `${context.event.headers.referer}success?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${context.event.headers.referer}failure`,
    // eslint-disable-next-line camelcase
    line_items,
    mode,
    payment_method_types: ['card'],
    customer: customerId,
  })
}

/**
 * @param {{ id: string }}
 *
 * @returns {import('stripe').Stripe.Checkout.Session}
 */
export const getCheckoutSession = async ({ id }) => {
  const checkoutSession = await stripe.checkout.sessions.retrieve(id)

  // Find out whether they've signed up
  const user = await db.user.findUnique({
    where: { email: checkoutSession.customer_details.email },
  })

  const isSignedUp = !!user

  return {
    id: checkoutSession.id,
    customerId: checkoutSession.customer,
    customerName: checkoutSession.customer_details.name,
    customerEmail: checkoutSession.customer_details.email,
    customerSignedUp: isSignedUp,
  }
}

export const createPaymentIntent = async () => {
  // need to calc amount and currency?

  // Always decide how much to charge on the server side, a trusted environment, as opposed to the client.
  // This prevents malicious customers from being able to choose their own prices.

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  })

  return {
    clientSecret: paymentIntent.client_secret,
  }
}
