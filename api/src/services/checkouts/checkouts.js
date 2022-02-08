import { stripe } from 'src/lib/stripe'

const getCartItems = {
  subscription: [
    {
      price: 'price_1JdarsFnEy6nnTnpxOI5D4fA',
      quantity: 1,
    },
  ],
  payment: [
    {
      price_data: {
        product_data: {
          name: 'Bag of Apples',
        },
        unit_amount: 3000,
        currency: 'zar',
      },
      quantity: 1,
    },
    {
      price_data: {
        product_data: {
          name: 'Bunch of Bananas',
        },
        unit_amount: 2800,
        currency: 'zar',
      },
      quantity: 1,
    },
  ],
}

/**
 * @typedef {'payment' | 'subscription'} Mode
 * @param {Mode} mode
 */
export const createCheckoutSession = async ({ mode }) => {
  // Retrieve cart items from DB or wherever
  const cartItems = getCartItems[mode]

  return stripe.checkout.sessions.create({
    line_items: cartItems,
    payment_method_types: ['card'],
    mode: mode,
    success_url: `http://localhost:8910/stripe-cart?success=true&sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:8910/stripe-cart?success=false`,
  })
}
