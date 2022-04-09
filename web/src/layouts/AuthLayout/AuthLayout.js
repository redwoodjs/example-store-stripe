// This handles a user coming straight to /login.
// Unlikely, but still.
import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes } from '@redwoodjs/router'

const AuthLayout = ({ children }) => {
  const { loading, isAuthenticated } = useAuth()

  // If auth is loading, it's really important we return null.
  // Otherwise we flash users with content, then redirect them
  // (if it turns out they're authenticated after all)
  if (loading) {
    return null
  }

  if (isAuthenticated) {
    return <Redirect to={routes.home()} />
  }

  return children
}

export default AuthLayout
