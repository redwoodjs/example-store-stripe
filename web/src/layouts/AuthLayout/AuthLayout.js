// This handles a user coming straight to /login.
// Unlikely, but still.
import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes } from '@redwoodjs/router'

const AuthLayout = ({ children }) => {
  const { loading, isAuthenticated } = useAuth()

  if (loading) {
    return null
  }

  if (isAuthenticated) {
    return <Redirect to={routes.home()} />
  }

  return children
}

export default AuthLayout
