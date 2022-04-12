import { useState } from 'react'

import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import styled from 'styled-components'

import { useMutation } from '@redwoodjs/web'

import { useStripe } from 'src/components/CartProvider'
import ProductsCell from 'src/components/ProductsCell'

const HomePage = () => {
  const stripe = useStripe()

  const [clientSecret, setSecret] = useState(undefined)

  const [createPaymentIntent] = useMutation(gql`
    mutation CreatePaymentIntent(
      $mode: Mode
      $cart: [CartItem]
      $customerId: ID
    ) {
      createPaymentIntent(mode: $mode, cart: $cart, customerId: $customerId) {
        clientSecret
      }
    }
  `)

  return (
    <Main>
      <article>
        <h2>Super Tokens</h2>
        <Description>
          These are single-use tokens. Great for emergencies and gifts.
        </Description>
        <ProductsCell />
      </article>

      <article>
        <h2>Super Subs</h2>
        <Description>
          Monthly subscriptions to superpowers. Great for the career
          supervillain, hero or parent.
        </Description>
        <ProductsCell type={'recurring'} />
      </article>

      <article>
        <button
          onClick={async () => {
            const {
              data: {
                createPaymentIntent: { clientSecret },
              },
            } = await createPaymentIntent()

            setSecret(clientSecret)
          }}
        >
          checkout with stripe elements
        </button>
        {clientSecret && (
          <Elements
            stripe={stripe}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
              },
            }}
          >
            <form>
              <PaymentElement />
              <button>Submit</button>
            </form>
          </Elements>
        )}
      </article>
    </Main>
  )
}

export default HomePage

// Styles

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding) * 2);
`

const Description = styled.p`
  margin-bottom: var(--padding);
`
