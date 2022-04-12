import { stripe } from 'src/lib/stripe'
import { getUserById } from 'src/services/users'

/**
 * @param {{ userId: int }}
 */
export const createBillingPortalSession = async ({ id }) => {
  const user = await getUserById({ id })

  return await stripe.billingPortal.sessions.create({
    customer: user.customerId,
    return_url: `${
      context.request?.headers?.referer ?? process.env.DOMAIN_URL
    }`,
  })
}
