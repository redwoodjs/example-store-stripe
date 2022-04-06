import { routes } from '@redwoodjs/router'
import Button from './Button'

export const text = () => {
  return <Button>Logout</Button>
}

export const icon = () => {
  return <Button icon="user" />
}

export const link = () => {
  return <Button to={routes.login()}>Login</Button>
}

export const primary = () => {
  return <Button variant="primary">Checkout</Button>
}

export const secondary = () => {
  return <Button variant="secondary">Cancel</Button>
}

export const disabled = () => {
  return <Button disabled>Disabled</Button>
}

export const linkSecondary = () => {
  return (
    <Button to={routes.signup()} variant="secondary">
      Sign Up
    </Button>
  )
}

export default { title: 'Components/Button' }
