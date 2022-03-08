import styled from 'styled-components'

import ProductsCell from 'src/components/ProductsCell'

const HomePage = () => {
  return (
    <>
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
    </>
  )
}

export default HomePage

const Description = styled.p`
  margin-bottom: var(--padding);
`
