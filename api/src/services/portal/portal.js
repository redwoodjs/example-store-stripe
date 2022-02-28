import { stripe } from 'src/lib/stripe'
import { getCustomerId } from '../users/users'

/**
 * @param {{ userId: int }}
 */
export const portal = async ({ userId }) => {
  // eslint-disable-next-line camelcase
  const customerId = await getCustomerId({ id: userId })
  console.log(customerId)
  return await stripe.billingPortal.sessions.create({
    customer: customerId.customerId,
    return_url: `${
      context.request?.headers?.referer ?? 'http://localhost:8910'
    }`,
  })
}
