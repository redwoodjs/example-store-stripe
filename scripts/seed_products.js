// To access your database
import { db } from '$api/src/lib/db'
import { dummyPrices } from './dummy/prices'

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SK)

export default async ({ args }) => {
  const priceResults = []
  let c = 0

  // Create once-off prices
  for (const price of dummyPrices) {
    try {
      const result = await stripe.prices.create(price)
      priceResults.push(result)
    } catch (err) {
      console.log(err.raw.message)
      priceResults.push({ error: err.raw.message })
      // if product exit then escapes the loop
      break
    }
    c++
  }

  priceResults.length > 1
    ? console.log('Products and prices seeded')
    : priceResults[0].error === 'Product already exists.'
    ? console.log('Stripe has already been seeded with Products and Prices')
    : console.log(
        'There was an error with seeding Stripe. Please try again later.'
      )
}
