import { stripe } from '../../lib/stripe'

//TODO: undefined returns all prices (dependent on Stripe to send the right information)
export const stripePrices = async ({ priceType }) => {
  const prices = await stripe.prices.list({
    type: priceType,
  })
  return prices.data
}

export const stripePricesVerbose = async ({ priceType }) => {
  // Gets Prices of a particular type
  const priceList = await stripePrices({ priceType })

  // Extracts list of product IDs
  const productIDList = priceList.map((price) => {
    return price.product
  })

  // Gets listed products
  const productsResults = await stripe.products.list({ ids: productIDList })
  const productList = productsResults.data

  // Create new verbose list using priceList and ProductResults
  const pricesVerboseList = priceList.map((price, i) => {
    return {
      ...price,
      product: productList[i],
    }
  })
  return pricesVerboseList
}
