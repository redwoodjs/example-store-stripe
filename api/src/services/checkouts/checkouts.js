import { stripe } from 'src/lib/stripe'

/**
 * @param {'payment' | 'subscription'} mode
 * @param {{ priceId: string, quantity: number }} cart
 */
export const checkout = async ({ mode, cart }) => {
  // eslint-disable-next-line camelcase
  const line_items = cart.map((product) => ({
    price: product.priceId,
    quantity: product.quantity,
  }))

  return stripe.checkout.sessions.create({
    success_url: `${
      context.request?.headers?.referer ?? 'http://localhost:8910'
    }?success=true&sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${
      context.request?.headers?.referer ?? 'http://localhost:8910'
    }?success=false`,
    // eslint-disable-next-line camelcase
    line_items,
    mode,
    payment_method_types: ['card'],
  })
}

export const getSession = ({ id }) => stripe.checkout.sessions.retrieve(id)
