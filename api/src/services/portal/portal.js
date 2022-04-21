import { stripe } from 'src/lib/stripe'

/**
 * @param {{ userId: int }}
 */
export const portal = async ({ userId }) => {
  // eslint-disable-next-line camelcase
  // Create Customer Portal session and send temp url to web side
  return await stripe.billingPortal.sessions.create({
    customer: userId,
    return_url: `${
      context.request?.headers?.referer ?? process.env.DOMAIN_URL
    }`,
  })
}
