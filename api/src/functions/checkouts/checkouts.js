import { logger } from 'src/lib/logger'
import { checkout } from 'src/services/checkouts'

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
export const handler = async (event, _context) => {
  logger.info('Invoked createCheckoutSession function')

  const { mode } = JSON.parse(event.body)

  const session = await checkout({ mode })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRIPE_SK}`,
    },
    body: JSON.stringify(session),
  }
}
