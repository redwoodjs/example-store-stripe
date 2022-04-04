import styled from 'styled-components'
import { routes } from '@redwoodjs/router'

import Shield from 'src/components/Shield'
import Button from 'src/components/Button'

const SuccessContent = ({ customerName, customerSignedUp }) => {
  return (
    <Wrapper>
      <Heading>Thank you</Heading>
      <Description>
        Have a <Emphasis>SUPER</Emphasis> day, {customerName}!
      </Description>
      <SVGWrapper>
        <Shield />
      </SVGWrapper>

      {!customerSignedUp && (
        <Banner>
          <p>
            It looks like you do not have an account yet. Signing up will allow
            you to checkout faster and see better at night.
          </p>
          <Button to={routes.signup()} variant={'secondary'}>
            Sign Up
          </Button>
        </Banner>
      )}
    </Wrapper>
  )
}

export default SuccessContent

const Wrapper = styled.div`
  background: var(--primary-tint);
  border-radius: 1em;
  margin: var(--padding);
  padding: var(--padding);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Heading = styled.h1`
  color: var(--white);
  font-size: 60px;
  text-align: center;
  letter-spacing: 2px;
`

const Description = styled.p`
  color: var(--white);
  text-align: center;
  font-size: 40px;
  font-weight: 700;
`

const Emphasis = styled.span`
  color: var(--primary);
`

const SVGWrapper = styled.div`
  margin-top: var(--padding);

  & svg {
    width: 250px;
    height: 250px;
  }
`

const Banner = styled.div`
  background: var(--primary);
  border-radius: 0.65em;
  margin-top: var(--padding);
  padding: var(--padding);
  box-shadow: var(--shadow);
  width: 100%;
  color: var(--white);
`
