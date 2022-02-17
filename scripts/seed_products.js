import { dummyPrices } from './dummy/prices'

import { stripe } from '$api/src/lib/stripe'

export default async ({ args }) => {
  const priceResults = []

  // Create one-off prices
  for (const price of dummyPrices) {
    try {
      const result = await stripe.prices.create(price)
      priceResults.push(result)
    } catch (err) {
      console.log(err.raw.message)
      priceResults.push({ error: err.raw.message })
      // If any of the price creations fail, escape the loop
      break
    }
  }

  (priceResults.length > 1)
    ? console.log('Products and prices seeded')
    : (priceResults[0].error === 'Product already exists.')
    ? console.log('Stripe has already been seeded with Products and Prices')
    : console.log(
        'There was an error with seeding Stripe. Please try again later.'
      )
}
