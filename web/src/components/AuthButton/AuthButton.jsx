import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const AuthButton = () => {
  const { isAuthenticated, logOut, currentUser } = useAuth()
  console.log(currentUser)

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logOut}>Log Out</button>
      ) : (
        <Link to={routes.login()}>Login</Link>
      )}
    </div>
  )
}

export default AuthButton
