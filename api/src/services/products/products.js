import { stripe } from 'src/lib/stripe'

export const products = async ({ type = 'one_time' }) => {
  const prices = await stripe.prices.list({
    type,
    expand: ['data.product'],
  })

  const products = prices.data.map((price) => {
    const { product } = price

    return {
      // product data
      id: price.id,
      name: product.name,
      description: product.description,
      images: product.images,
      // price data
      price: price.unit_amount,
      productId: product.id,
      type: price.type,
    }
  })

  return products
}
