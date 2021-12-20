import { stripe } from '../../lib/stripe'

//TODO: undefined returns all prices (dependent on Stripe to send the right information)
export const stripePrices = async ({ priceType }) => {
  const prices = await stripe.prices.list({
  type: priceType,
  });
  return prices.data
}
