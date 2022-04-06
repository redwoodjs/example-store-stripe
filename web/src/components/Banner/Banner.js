import styled from 'styled-components'

const Banner = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
export default Banner

const Wrapper = styled.div`
  background: var(--primary);
  border-radius: 0.65em;
  margin-top: var(--padding);
  padding: var(--padding);
  box-shadow: var(--shadow);
  width: 100%;
  color: var(--white);
`
