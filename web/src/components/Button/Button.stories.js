import { User } from 'react-feather'

import Button from './Button'

export const secondary = () => {
  return <Button variant="secondary">Cancel</Button>
}

export const icon = () => {
  return (
    <Button variant="icon">
      <User />
    </Button>
  )
}

export const link = () => {
  return (
    <Button variant="link" to={'/'}>
      Login
    </Button>
  )
}

export const fill = () => {
  return <Button>Checkout</Button>
}

export const linkSecondary = () => {
  return (
    <Button variant="secondary" to={'signup'}>
      Sign Up
    </Button>
  )
}

export default { title: 'Components/Button' }
