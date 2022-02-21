import { Link, routes } from '@redwoodjs/router'
import styled from 'styled-components'

const Logo = () => {
  return (
    <StyledLink to={routes.home()}>
      <h1>SuperPOW!!!</h1>
    </StyledLink>
  )
}

export default Logo

// Styles

const StyledLink = styled(Link)`
  color: #0a0a0a;
  text-decoration: none;
`
