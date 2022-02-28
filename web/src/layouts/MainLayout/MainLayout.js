import styled from 'styled-components'

import Cart from 'src/components/Cart'
import AuthButton from 'src/components/AuthButton'
import Footer from 'src/components/Footer'

const MainLayout = ({ children }) => {
  return (
    <Grid>
      <Row>
        <Gradient>SuperPOW!!!</Gradient>
        <ActionGroup>
          <AuthButton />
          <Cart />
        </ActionGroup>
      </Row>
      <Column>{children}</Column>
      <Footer />
    </Grid>
  )
}

export default MainLayout

// Styles

const Grid = styled.div`
  --breathing-room: var(--size-3);

  display: grid;
  grid-template-columns:
    1fr
    min(75ch, 100%)
    1fr;
  padding-left: var(--breathing-room);
  padding-right: var(--breathing-room);
  row-gap: var(--breathing-room);

  & > * {
    grid-column: 2;
  }

  & > *:first-child {
    padding-top: var(--breathing-room);
  }
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
const ActionGroup = styled.div`
  display: flex;
  justify-content: end;

  gap: var(--size-3);
`
