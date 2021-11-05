import { logger } from 'src/lib/logger'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

const stripe = require('stripe')(process.env.STRIPE_SK)

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

export const handler = async (event, context) => {
  logger.info('Invoked createCheckoutSession function')
  const mode = JSON.parse(event.body).mode

  // Retrieve cart items from DB or wherever
  const cartItems = getCartItems[mode]

  const session = await stripe.checkout.sessions.create({
    line_items: cartItems,
    payment_method_types: ['card'],
    mode: mode,
    success_url: `http://localhost:8910/stripe-cart?success=true&sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:8910/stripe-cart?success=false`,
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRIPE_SK}`,
    },
    body: JSON.stringify(session),
  }
}
