import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper>
      This example store is powered by{' '}
      <Link href="https://redwoodjs.com/" target="_blank" rel="noreferrer">
        Redwoodjs
      </Link>{' '}
      and{' '}
      <Link href="https://stripe.com/" target="_blank" rel="noreferrer">
        Stripe
      </Link>{' '}
      | View the repository on{' '}
      <Link href="https://github.com/redwoodjs/example-store" target="_blank">
        GitHub
      </Link>
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

const Link = styled.a`
  color: var(--primary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
