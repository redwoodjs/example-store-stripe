import { db } from 'src/lib/db'
import { stripe } from 'src/lib/stripe'

/**
 * @type {'payment' | 'subscription'} Mode
 * @type {{ id: string, quantity: number }} Cart
 *
 * @param {{
 *  mode: Mode
 *  cart: Cart
 *  customerId: string
 * }}
 */
export const checkout = async ({ mode, cart, customerId }, { context }) => {
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

export const getSession = async ({ id }) => {
  // Get session object
  const session = await stripe.checkout.sessions.retrieve(id)

  // Use customer to find out whether customer has signed up before
  const user = await db.user.findUnique({
    where: { email: session.customer_details.email },
  })

  const isSignedUp = !!user

  return {
    id: session.id,
    customerId: session.customer,
    customerName: session.customer_details.name,
    customerEmail: session.customer_details.email,
    customerSignedUp: isSignedUp,
  }
}
