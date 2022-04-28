import styled from 'styled-components'

import { MetaTags } from '@redwoodjs/web'

const FailurePage = () => {
  return (
    <>
      <MetaTags title="Failure" description="Failure page" />

      <Wrapper>
        <Heading>Oops!</Heading>
        <Description>Unfortunately your sale did not go through :(</Description>
      </Wrapper>
    </>
  )
}

export default FailurePage

const Wrapper = styled.div`
  height: fit-content;

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
  font-size: 24px;
  font-weight: 700;
`
