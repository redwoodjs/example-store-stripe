import styled from 'styled-components'

import { useState } from 'react'

import ProductsCell from 'src/components/ProductsCell'
import Overlay from 'src/components/Overlay'

const HomePage = () => {
  const [isVisible, setOverlayVisibility] = useState(false)
  const handleOverlayDisplay = () => {
    setOverlayVisibility(!isVisible)
  }

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

      <button onClick={handleOverlayDisplay}>Show Overlay</button>
      {isVisible && (
        <Overlay>
          <p>derp</p>
        </Overlay>
      )}
    </>
  )
}

export default HomePage

const Description = styled.p`
  margin-bottom: var(--size-3);
`
