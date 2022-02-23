import styled from 'styled-components'

import Cart from 'src/components/Cart'
import SiteFooter from 'src/components/SiteFooter'

const MainLayout = ({ children }) => {
  return (
    <SiteWrapper>
      <Wrapper>
        <Row>
          <Gradient>Superstore</Gradient>
          <Cart />
        </Row>
        <Column>{children}</Column>
      </Wrapper>
      <SiteFooter />
    </SiteWrapper>
  )
}

export default MainLayout

// Styles

const SiteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100vh;
`

const Wrapper = styled.div`
  padding-top: var(--size-4);

  width: var(--size-15);
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`

const Row = styled.header`
  display: flex;
  justify-content: space-between;
`

const Gradient = styled.h1`
  background: var(--gradient-3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Column = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
`
