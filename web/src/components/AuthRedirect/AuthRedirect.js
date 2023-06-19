// This handles a user coming straight to /login.
// Unlikely, but still.
import { Redirect, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

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
