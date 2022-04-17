import styled from 'styled-components'

import { Link } from '@redwoodjs/router'

const Button = ({ children, ...props }) => {
  const { to, variant, ...rest } = props

  let Component

  switch (variant) {
    case 'secondary':
      Component = SecondaryButton
      break
    case 'icon':
      Component = IconButton
      break
    case 'link':
      Component = LinkButton
      break
    default:
      Component = FillButton
  }

  if (to) {
    return (
      <Component as={StyledLink} to={to} {...rest}>
        {children}
      </Component>
    )
  }

  return <Component {...rest}>{children}</Component>
}

export default Button

// Styles

const BaseButton = styled.button`
  padding: var(--size-2) var(--size-3);
  border: none;
  border-radius: var(--radius-2);

  &:hover {
    cursor: pointer;
  }
`

const SecondaryButton = styled(BaseButton)`
  background-color: var(--gray-3);

  transition: 500ms;

  &:hover {
    filter: brightness(105%);
    transition: filter 200ms;
  }
`

const IconButton = styled(BaseButton)`
  background-color: transparent;

  transition: 500ms;

  &:hover {
    background-color: var(--gray-2);
    transition: background-color 200ms;
  }

  & > svg {
    color: var(--primary);
  }
`

const LinkButton = styled(BaseButton)`
  &:hover {
    text-decoration: underline;
  }
`

const FillButton = styled(BaseButton)`
  background-color: var(--primary);
  color: var(--gray-0);

  transition: filter 500ms;

  &:hover {
    cursor: pointer;
    filter: brightness(135%);
    transition: filter 200ms;
  }
`

const StyledLink = styled(Link)`
  color: var(--link);

  text-decoration: none;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`
