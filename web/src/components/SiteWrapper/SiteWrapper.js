import styled from 'styled-components'

const SiteWrapper = ({ children, className }) => (
  <Wrapper className={className}>
    <Content>{children}</Content>
  </Wrapper>
)

export default SiteWrapper

// Styles

const Wrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
`

const Content = styled.div`
  width: 80%;
  max-width: 2049px;
  margin: 0 auto;
  position: relative;
`
