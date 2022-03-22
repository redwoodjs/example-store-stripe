import styled from 'styled-components'

import Cart from 'src/components/Cart'
import AuthButton from 'src/components/AuthButton'
import Footer from 'src/components/Footer'

const MainLayout = ({ children }) => {
  return (
    <Grid>
      <Row>
        <div>
          <Gradient>Superstore</Gradient>
          <Subtitle>
            powered by <TextLink>Redwoodjs</TextLink> +{' '}
            <TextLink>Stripe</TextLink>
          </Subtitle>
        </div>

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
  display: grid;
  grid-template-columns:
    1fr
    min(75ch, 100%)
    1fr;
  padding-left: var(--padding);
  padding-right: var(--padding);
  row-gap: var(--padding);

  & > * {
    grid-column: 2;
  }

  & > *:first-child {
    padding-top: var(--padding);
  }
`

const Row = styled.header`
  display: flex;
  justify-content: space-between;
`

const Gradient = styled.h1`
  background: var(--gradient-3);
  letter-spacing: 1px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Subtitle = styled.p`
  color: var(--gray-6);
`

const TextLink = styled.a`
  &:hover {
    color: var(--primary);
    cursor: pointer;
  }
`

const Column = styled.main`
  display: flex;
  flex-direction: column;

  gap: var(--padding);
`
const ActionGroup = styled.div`
  display: flex;
  justify-content: end;
  position: relative;

  gap: var(--padding);
`
