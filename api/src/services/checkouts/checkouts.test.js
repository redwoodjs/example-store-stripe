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

    const session = await checkout({ mode: 'payment', cart })

    expect(stripe.checkout.sessions.create).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": Array [
          Array [
            Object {
              "cancel_url": "http://localhost:8910?success=false",
              "line_items": Array [
                Object {
                  "price": "123",
                  "quantity": 1,
                },
                Object {
                  "price": "456",
                  "quantity": 1,
                },
              ],
              "mode": "payment",
              "payment_method_types": Array [
                "card",
              ],
              "success_url": "http://localhost:8910?success=true",
            },
          ],
        ],
        "results": Array [
          Object {
            "type": "return",
            "value": Object {
              "id": 1,
            },
          },
        ],
      }
    `)

    expect(session).toHaveProperty('id')
  })
})
