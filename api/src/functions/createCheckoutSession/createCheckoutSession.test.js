import { mockHttpEvent } from '@redwoodjs/testing/api'

import { handler } from './createCheckoutSession'

import { stripe } from 'src/lib/stripe'

jest.mock('../../lib/stripe')

describe('createCheckoutSession function', () => {
  it('Should create a payment-mode Checkout Session and respond with 200', async () => {
    stripe.checkout.sessions.create = jest.fn()

    const httpEvent = mockHttpEvent({
      payload: JSON.stringify({ mode: 'payment' }),
    })

    const response = await handler(httpEvent, null)

    expect(response.statusCode).toBe(200)

    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'payment',
      })
    )
  })
})
