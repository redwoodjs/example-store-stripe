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

  padding: 0.5em var(--padding);
  border-radius: 2px;
  display: inline-flex;
  align-items: center;

  &:active {
    cursor: pointer;
  }

  &:hover {
    cursor: pointer;
    background: var(--gray-1);
  }

  ${(props) =>
    props.active &&
    css`
      cursor: pointer;
      background: var(--gray-light);
      color: var(--primary);

      svg {
        stroke: var(--primary);
      }
    `}

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background: var(--primary);
      color: var(--white);
      padding: 0.5em var(--padding);

      &:hover {
        background: var(--gray-1);
        color: var(--black);
      }
    `}

     ${(props) =>
    props.variant === 'secondary' &&
    css`
      background: var(--gray-dark);
      color: var(--white);
      padding: 0.5em var(--padding);

      &:hover {
        background: var(--gray-light);
        color: var(--black);
      }
    `}

    ${(props) =>
    props.disabled &&
    css`
      background: var(--gray-light);
      color: var(--gray-dark);

      &:hover {
        cursor: default;
        color: var(--gray-dark);
      }
    `}
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  background: none;
  border: none;
  padding: 0;

  padding: 0.5em var(--padding);
  display: inline-flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    background: var(--gray-1);
    border-radius: 2px;
  }
`
