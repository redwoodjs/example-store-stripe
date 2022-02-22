import styled from 'styled-components'

import Cart from 'src/components/Cart'

const MainLayout = ({ children }) => {
  return (
    <Wrapper>
      <Row>
        <Gradient>SuperPOW!!!</Gradient>
        <Cart />
      </Row>
      <Column>{children}</Column>
    </Wrapper>
  )
}

export default MainLayout

// Styles

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
