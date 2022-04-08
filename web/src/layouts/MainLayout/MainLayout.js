import { routes, Link } from '@redwoodjs/router'
import styled from 'styled-components'

import AuthButton from 'src/components/AuthButton'
import Cart from 'src/components/Cart'
import Footer from 'src/components/Footer'

const MainLayout = ({ children }) => {
  return (
    <Grid>
      <Header>
        <H1>
          <StyledLink to={routes.home()}>
            <Gradient>Superstore</Gradient>
          </StyledLink>

          <Subtitle>
            Powered by{' '}
            <A
              href="https://redwoodjs.com"
              style={{
                '--color': 'var(--redwood)',
              }}
            >
              RedwoodJS
            </A>{' '}
            and{' '}
            <A
              href="https://stripe.com/"
              style={{ '--color': 'var(--stripe)' }}
            >
              Stripe
            </A>
          </Subtitle>
        </H1>
        <AuthButton
          style={{ transform: 'translateY(calc(var(--padding) / 2))' }}
        />
        <HLine
          style={{
            transform: 'translateY(var(--size-2))',
          }}
        />
        <Cart
          style={{
            transform: 'translateY(var(--size-2))',
          }}
        />
      </Header>
      {children}
      <Footer />
    </Grid>
  )
}

export default MainLayout

// Styles

const Grid = styled.div`
  height: 100%;

  /*
    On the home page, there's a scroll bar, but on the login page, there isn't.
    This dynamically adjusts the padding on the left of the grid so that it doesn't move.
    See https://stackoverflow.com/a/30293718.
  */
  padding-left: calc(100vw - 100%);

  display: grid;
  row-gap: var(--padding);

  /*
    The min function takes two values and returns the smaller of them.
    Since one's dynamic (calc), that'll be smaller on small screens.
    We subtract from it so that things don't go all the way to the edge.
  */
  grid-template-columns:
    1fr
    min(var(--size-md), calc(100% - var(--padding) * 2))
    1fr;

  /*
    We don't want the header to grow larger on the login page.
  */
  grid-template-rows: var(--size-11) 1fr;

  /*
    Center all the grid's direct children.
  */
  & > * {
    grid-column: 2;
  }
`

const Header = styled.header`
  /*
    This is relative for its after pseudo-element.
  */
  position: relative;

  /*
    Asymmetrical padding for optical alignment.
   */
  padding-bottom: var(--size-4);

  display: flex;
  justify-content: space-between;

  /*
    This one's a little tricky,
    but right now center (instead of baseline) seems to give the best results.
  */
  align-items: center;

  /*
    The gradient border below the header.
  */
  &:after {
    content: '';
    position: absolute;
    bottom: 0px;

    width: 100%;
    height: calc(var(--padding) / 2);

    background-image: var(--brand-gradient);
  }
`

const H1 = styled.h1`
  /*
    Push the other flex items all the way to the right.
  */
  margin-right: auto;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  font-size: var(--font-size-7);
  font-weight: var(--font-weight-9);

  transition: filter 500ms;

  &:hover {
    filter: brightness(135%);
    transition: filter 200ms;
  }
`

const Gradient = styled.span`
  background: var(--brand-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Subtitle = styled.span`
  /*
    We want it to sit on its own line.
    We could use a <p> tag, but I'm not sure if they can be children of <h1>s.
  */
  display: block;
  padding-left: var(--padding);

  /*
    Tone down some of the <h1>'s styles.
  */
  color: var(--gray-6);
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-4);
`

const A = styled.a`
  text-decoration: none;
  color: var(--color);

  &:hover {
    text-decoration: underline;
  }
`

const HLine = styled.div`
  width: 1px;
  height: 25%;
  background-color: var(--gray-6);
`
