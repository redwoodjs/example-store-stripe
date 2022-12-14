import styled from 'styled-components'

import StripeItemsCell from 'src/components/StripeItemsCell'

const HomePage = () => {
  return (
    <Wrapper>
      <article>
        <h2>Super Tokens</h2>
        <Description>
          These are single-use tokens. Great for emergencies and gifts.
        </Description>
        <StripeItemsCell
          params={{
            productParams: { active: true },
            priceParams: { type: 'one_time' },
          }}
        />
      </article>

      <article>
        <Description>
          Monthly subscriptions to superpowers. Great for the career
          supervillain, hero or parent.
        </Description>
        <StripeItemsCell
          params={{
            productParams: { active: true },
            priceParams: { type: 'recurring' },
          }}
        />
      </article>
    </Wrapper>
  )
}

export default HomePage

// Styles

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding) * 2);
`

const Description = styled.p`
  margin-bottom: var(--padding);
`
