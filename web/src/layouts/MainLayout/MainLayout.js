import styled from 'styled-components'

import { routes, Link } from '@redwoodjs/router'

import AuthButton from 'src/components/AuthButton'
import Cart from 'src/components/Cart'
import Footer from 'src/components/Footer'

const MainLayout = ({ children }) => {
  return (
    <Grid>
      <Row>
        <h1>
          <NoStyleLink to={routes.home()}>
            <Gradient>Superstore</Gradient>
          </NoStyleLink>

          <Subtitle>
            Powered by{' '}
            <ALink
              href="https://redwoodjs.com"
              style={{
                '--color': 'var(--redwood)',
              }}
            >
              RedwoodJS
            </ALink>{' '}
            and{' '}
            <ALink
              href="https://stripe.com/"
              style={{ '--color': 'var(--stripe)' }}
            >
              Stripe
            </ALink>
          </Subtitle>
        </h1>
        <div style={{ paddingTop: '16px' }}>
          <ActionGroup>
            <AuthButton />
            <Cart />
          </ActionGroup>
        </div>
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
  min-height: 100vh;
  grid-template-columns:
    1fr
    min(75ch, 100%)
    1fr;
  grid-template-rows: auto 1fr auto;
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
  position: relative;
`

const Gradient = styled.span`
  ${'' /* background: var(--gradient-3); */}
  background: var(--brand-gradient);
  letter-spacing: 1px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
const NoStyleLink = styled(Link)`
  text-decoration: none;
`

const Column = styled.main`
  display: flex;
  flex-direction: column;

  gap: var(--padding);
`
const ActionGroup = styled.div`
  display: flex;
  justify-content: end;

  gap: var(--padding);
`

const Subtitle = styled.span`
  font-size: var(--font-size-2);
  font-weight: 400;
  display: block;
  padding-left: var(--padding);

  color: var(--gray-6);
`

const ALink = styled.a`
  text-decoration: none;
  color: var(--color);

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
