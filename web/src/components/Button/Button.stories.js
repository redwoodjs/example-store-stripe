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

export default { title: 'Components/Button' }
