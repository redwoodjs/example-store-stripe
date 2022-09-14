import { stripe } from 'src/lib/stripe'

import { checkout } from './checkouts'

describe('checkout', () => {
  it('Creates a checkout session given a cart', async () => {
    const cart = [
      {
        id: '123',
        quantity: 1,
      },
      {
        id: '456',
        quantity: 1,
      },
    ]

    stripe.checkout.sessions.create = jest.fn(() => ({ id: 1 }))

    const session = await checkout(
      {
        mode: 'payment',
        cart,
        customerId: 'cus0000001',
      },
      {
        context: {
          event: {
            headers: {
              referer: 'http://localhost:8910/',
            },
          },
        },
      }
    )

    expect(stripe.checkout.sessions.create).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": [
          [
            {
              "cancel_url": "http://localhost:8910/failure",
              "customer": "cus0000001",
              "line_items": [
                {
                  "price": "123",
                  "quantity": 1,
                },
                {
                  "price": "456",
                  "quantity": 1,
                },
              ],
              "mode": "payment",
              "payment_method_types": [
                "card",
              ],
              "success_url": "http://localhost:8910/success?sessionId={CHECKOUT_SESSION_ID}",
            },
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": {
              "id": 1,
            },
          },
        ],
      }
    `)

    expect(session).toHaveProperty('id')
  })
})
