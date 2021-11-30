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
      const result = await stripe.prices.create(price, {
        idempotencyKey: `pricesik${c}`,
      })
      priceResults.push(result)
    } catch (err) {
      console.log(err)
    }
    c++
  }

  console.log(priceResults)
  console.log(':: Executing script with args ::')
  console.log(args)
}
