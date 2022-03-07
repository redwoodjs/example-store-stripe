import { dummyPrices } from './dummy/prices'

import { stripe } from '$api/src/lib/stripe'

export default async () => {
  const priceResults = []

  // retrieve list of active products. ie. Products that havent been archived
  const products = await stripe.products.list({
    active: true,
  })

  // Check length
  if (products.data.length > 0) {
    console.log(
      'It looks like you already have products seeded. Archive ALL the products in your Stripe store and run the script again'
    )
  } else if (products.data.length === 0) {
    //  create prices from dummy data and then update the created product
    for (const price of dummyPrices) {
      try {
        const { product } = await stripe.prices.create(price.createPrice)
        const result = await stripe.products.update(
          product,
          price.updateProduct
        )
        priceResults.push(result)
      } catch (err) {
        console.log(err.raw.message)
        priceResults.push({ error: err.raw.message })
        // If any of the price creations fail, escape the loop
        break
      }
    }

    // ERROR HANDLING
    const errorArray = priceResults.filter((price) => {
      return 'error' in price
    })
    const hasError = errorArray.length > 0

    if (priceResults.length > 0 && !hasError) {
      console.log('Products have been added to Stripe Store')
    } else if (hasError) {
      console.log(errorArray[0].error)
    }
  } else {
    console.log(
      'Looks like something went wrong and products could not be seeded '
    )
    return
  }
}
