import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper>
      This example store is powered by{' '}
      <A href="https://redwoodjs.com/" target="_blank" rel="noreferrer">
        Redwoodjs
      </A>{' '}
      and{' '}
      <A href="https://stripe.com/" target="_blank" rel="noreferrer">
        Stripe
      </A>
      . View the repository on{' '}
      <A href="https://github.com/redwoodjs/example-store" target="_blank">
        GitHub
      </A>
    </Wrapper>
  )
}

export default Footer

// Styles

const Wrapper = styled.footer`
  padding-top: var(--padding);
  padding-bottom: var(--padding);

  border-top: var(--border-size-1) solid var(--gray-9);

  font-size: var(--font-size-0);
`

const A = styled.a`
  color: var(--primary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
