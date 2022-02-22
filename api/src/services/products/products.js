import { stripe } from 'src/lib/stripe'

export const products = async ({ type = 'one_time' }) => {
  const prices = await stripe.prices.list({
    type,
    expand: ['data.product'],
  })

  const products = prices.data.map((price) => {
    const { product } = price

    return {
      id: price.id,
      name: product.name,
      description: product.description,
      image: product.images[0],
      price: price.unit_amount,
      type: price.type,
    }
  })

  return products
}
