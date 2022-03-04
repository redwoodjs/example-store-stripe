import { dummyPrices } from './dummy/prices'

import { stripe } from '$api/src/lib/stripe'

export default async ({ args }) => {
  const priceResults = []

  // retrieve list
  const prices = await stripe.prices.list({
    active: true,
  })

  console.log(prices.length)

  if (prices.length > 0) {
    console.log(
      'It looks like you already have products seeded. Archive products in your Stripe store and run the script again'
    )
  }
  // check length:  If length > 0 abandon -> "It looks like you already have products seeded. Archive products in your Stripe store and try seeding again"
  //                If length === 0 continue
  //                filter by name and update product description -> Products and prices seeded

  // Create prices
  // for (const price of dummyPrices) {
  //   try {
  //     const result = await stripe.prices.create(price)
  //     priceResults.push(result)
  //   } catch (err) {
  //     console.log(err.raw.message)
  //     priceResults.push({ error: err.raw.message })
  //     // If any of the price creations fail, escape the loop
  //     break
  //   }
  // }

  // priceResults.length > 1
  //   ? console.log('Products and prices seeded')
  //   : priceResults[0].error === 'Product already exists.'
  //   ? console.log('Stripe has already been seeded with Products and Prices')
  //   : console.log(
  //       'There was an error with seeding Stripe. Please try again later.'
  //     )
}
