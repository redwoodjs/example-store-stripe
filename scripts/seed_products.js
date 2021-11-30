// To access your database
import { db } from '$api/src/lib/db'
import { dummyPrices } from './dummy/prices'

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SK)

export default async ({ args }) => {
  const priceResults = []
  for (const price of dummyPrices) {
    const result = await stripe.prices.create(price, {
      idempotencyKey: `${price.product_data.id}ik`,
    })
    priceResults.push(result)
  }

  console.log(priceResults)
  console.log(':: Executing script with args ::')
  console.log(args)
}
