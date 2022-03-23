import styled, { css } from 'styled-components'
import { User, ShoppingCart } from 'react-feather'

import { Link } from '@redwoodjs/router'

const Icons = {
  user: User,
  shoppingCart: ShoppingCart,
}

const Button = ({ children = '', icon = '', ...args }) => {
  const handleOnButtonClick = (e) => {
    if ('onClick' in args) {
      args.onClick(e)
    }
  }
  const Icon = Icons[icon]
  if ('to' in args) {
    return <StyledLink to={args.to}>{children}</StyledLink>
  } else {
    return (
      <StyledButton onClick={handleOnButtonClick} {...args}>
        {children} {icon !== '' && <Icon />}
      </StyledButton>
    )
  }
}

export default Button

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;

  display: inline-flex;
  align-items: center;

  &:active {
    cursor: pointer;
    color: var(--primary);
  }

  &:hover {
    cursor: pointer;
    color: var(--primary);

    svg {
      stroke: var(--primary);
    }
  }
  ${(props) =>
    props.active &&
    css`
      cursor: pointer;
      color: var(--primary);

      svg {
        stroke: var(--primary);
      }
    `}
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

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
