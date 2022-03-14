import styled from 'styled-components'
import { User, ShoppingCart } from 'react-feather'

import { Link } from '@redwoodjs/router'

const Icons = {
  'user': User,
  'shoppingCart': ShoppingCart
}

const Button = ({ children = '', icon = '', ...args }) => {
  const Icon = Icons[icon]

  const handleOnButtonClick = e => {
    if (!onClick in args && !to in args) {
      e.preventDefault()
    } else if (!onClick in args && to in args) {

    } else {
      args.onClick
    }
  }
  return !to in args ? (
    <StyledButton onClick={handleOnButtonClick} {...args}>
      {children} {icon !== '' && (<Icon/>)}
  </StyledButton>
  ) : (
      <StyledLink to={args.to}>{children}</StyledLink>
  )
}

export default Button

const sharedStyles = css`
background: none;
    border: none;
    padding: 0;

    display: inline-flex;
    align-items: center;

    &:hover {
      cursor: pointer;
      color: var(--primary);

      svg {
        stroke: var(--primary);
      }
    }
`

const StyledButton = styled.button`
  $(sharedStyles)
`

const StyledLink = styled(Link)`
  $(sharedStyles)
`
