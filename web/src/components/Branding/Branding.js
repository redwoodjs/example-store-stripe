import styled from 'styled-components'

import { routes, Link } from '@redwoodjs/router'

const Branding = ({ style }) => {
  return (
    <h1 style={style}>
      <TitleLink to={routes.home()}>
        <Gradient>Superstore</Gradient>
      </TitleLink>

      <Subtitle>
        Powered by{' '}
        <BrandLink
          href="https://redwoodjs.com"
          style={{
            '--color': 'var(--redwood)',
          }}
        >
          RedwoodJS
        </BrandLink>{' '}
        and{' '}
        <BrandLink
          href="https://stripe.com/"
          style={{ '--color': 'var(--stripe)' }}
        >
          Stripe
        </BrandLink>
      </Subtitle>
    </h1>
  )
}

export default Branding

const TitleLink = styled(Link)`
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

  color: var(--gray-6);
  font-size: var(--font-size-2);
  font-weight: 400;
`

const BrandLink = styled.a`
  text-decoration: none;
  color: var(--color);

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
