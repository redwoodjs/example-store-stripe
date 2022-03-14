import styled from 'styled-components'
import { User, ShoppingCart } from 'react-feather'

const Icons = {
  'user': User,
  'shoppingCart': ShoppingCart
}

const Button = ({ children = '', icon = '', onClick = () => console.log('Button clicked'), ...args }) => {
  const Icon = Icons[icon]
  return (
    <ButtonStyled onClick={onClick} {...args}>
      {children} {icon !== '' && (<Icon/>)}
  </ButtonStyled>
  )
}

export default Button

const ButtonStyled = styled.button`
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
