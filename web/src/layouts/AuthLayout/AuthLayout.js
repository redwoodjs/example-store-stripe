import styled from 'styled-components'

import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes } from '@redwoodjs/router'

import Footer from 'src/components/Footer'

const AuthLayout = ({ children }) => {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return null
  }

  if (isAuthenticated) {
    return <Redirect to={routes.home()} />
  }

  return (
    <Grid>
      <Row>
        <h1>
          <Gradient>Superstore</Gradient>
          <Subtitle>
            Powered by{' '}
            <Link
              href="https://redwoodjs.com"
              style={{
                '--color': 'var(--redwood)',
              }}
            >
              RedwoodJS
            </Link>{' '}
            and{' '}
            <Link
              href="https://stripe.com/"
              style={{ '--color': 'var(--stripe)' }}
            >
              Stripe
            </Link>
          </Subtitle>
        </h1>
      </Row>
      <Column>{children}</Column>
      <Footer />
    </Grid>
  )
}

export default AuthLayout

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
    padding-top: var(--breathing-room);
  }
`

const Row = styled.header`
  display: flex;
  justify-content: space-between;
`

const Gradient = styled.span`
  background: var(--brand-gradient);
  letter-spacing: 1px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Column = styled.main`
  display: flex;
  flex-direction: column;

  gap: var(--padding);
`

const Subtitle = styled.span`
  font-size: var(--font-size-2);
  font-weight: 400;
  display: block;
  padding-left: var(--padding);

  color: var(--gray-6);
`

const Link = styled.a`
  text-decoration: none;
  color: var(--color);

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
