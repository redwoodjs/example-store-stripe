import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './retrieveCheckoutSession'

import { stripe } from 'src/lib/stripe'

jest.mock('../../lib/stripe')

describe('retrieveCheckoutSession function', () => {
  it('Should respond with 200', async () => {
    stripe.checkout.sessions.retrieve = jest.fn()

    const id = 1

    const httpEvent = mockHttpEvent({
      payload: JSON.stringify({
        id,
      }),
    })

    const response = await handler(httpEvent, null)

    expect(response.statusCode).toBe(200)

    expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledWith(id)
  })
})
