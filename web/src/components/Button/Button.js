import styled, { css } from 'styled-components'
import { Link } from '@redwoodjs/router'

const Button = ({ children, ...props }) => {
  const { to, variant, ...rest } = props

  if ('to' in props) {
    return (
      <StyledLink to={to} {...rest}>
        {children}
      </StyledLink>
    )
  }

  switch (variant) {
    case 'secondary':
      return <SecondaryButton {...rest}>{children}</SecondaryButton>
    case 'transparent':
      return <TransparentButton {...rest}>{children}</TransparentButton>
    default:
      return <ButtonBase {...rest}>{children}</ButtonBase>
  }
}

export default Button

// Styles

const StyledLink = styled(Link)`
  text-decoration: none;

  color: var(--link);

  padding: var(--size-1) var(--size-3);
  border-radius: var(--radius-2);

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const ButtonBase = styled.button`
  padding: var(--size-2) var(--size-3);

  background-color: var(--primary);

  border: none;
  border-radius: var(--radius-2);

  color: var(--gray-0);

  transition: filter 500ms;

  &:hover {
    cursor: pointer;
    filter: brightness(135%);
    transition: filter 200ms;
  }
`

const SecondaryButton = styled(ButtonBase)`
  background-color: var(--gray-5);

  &:hover {
    filter: brightness(115%);
    transition: filter 200ms;
  }
`

const TransparentButton = styled(ButtonBase)`
  background-color: transparent;
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--gray-3);
    `}
`
