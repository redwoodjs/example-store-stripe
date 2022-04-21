import { stripe } from 'src/lib/stripe'

import { getCustomerId } from '../users/users'

/**
 * @param {{ userId: int }}
 */
export const portal = async ({ userId }) => {
  // eslint-disable-next-line camelcase
  const customer = await getCustomerId({ id: userId })

  // Create Customer Portal session and send temp url to web side
  return await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${
      context.request?.headers?.referer ?? process.env.DOMAIN_URL
    }`,
  })
}
