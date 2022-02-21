import { stripe } from 'src/lib/stripe'

export const products = async () => {
  const prices = await stripe.prices.list({
    expand: ['data.product'],
  })

  const products = prices.data.map((price) => {
    const { product } = price

    return {
      // product data
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      // price data
      price: price.unit_amount,
      priceId: price.id,
    }
  })

  return products
}
