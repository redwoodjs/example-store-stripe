import { User } from 'react-feather'

import Button from './Button'

export const Fill = () => {
  return <Button>Checkout</Button>
}

export const Secondary = () => {
  return <Button variant="secondary">Cancel</Button>
}

export const Icon = () => {
  return (
    <Button variant="icon">
      <User />
    </Button>
  )
}

export const Link = () => {
  return (
    <Button variant="link" to={'/'}>
      Login
    </Button>
  )
}

export const LinkSecondary = () => {
  return (
    <Button variant="secondary" to={'signup'}>
      Sign Up
    </Button>
  )
}

export const _Library = () => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Fill />
      <Secondary />
      <Icon />
      <Link />
      <LinkSecondary />
    </div>
  )
}

export default { title: 'Components/Button' }
