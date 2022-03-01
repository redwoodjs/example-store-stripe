import styled from 'styled-components'
import { User } from 'react-feather'

import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'

const AuthButton = () => {
  const { isAuthenticated, logOut, currentUser } = useAuth()

  const [portal] = useMutation(
    gql`
      mutation Portal($userId: ID!) {
        portal(userId: $userId) {
          url
        }
      }
    `
  )

  const onLogoutButtonClick = () => {
    logOut().then(() => toast.success('You have been successfully logged out'))
  }

  const onUserButtonClick = async () => {
    // create portal session to get temp url
    const session = currentUser
    const {
      data: {
        portal: { url },
      },
    } = await portal({
      variables: { userId: session.id },
    })
    // redirect user to Stripe customer portal
    window.location.replace(url)
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <Button onClick={onLogoutButtonClick}>
            <span>Log Out</span>
          </Button>
          <Button onClick={onUserButtonClick}>
            {/* Links to customer portal */}
            <User />
          </Button>
        </>
      ) : (
        <LoginLink to={routes.login()}>
          <span>Log In </span>
        </LoginLink>
      )}
      <HLine />
    </>
  )
}

export default AuthButton

// Styles

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;

  display: inline-flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const LoginLink = styled(Link)`
  display: inline-flex;
  align-items: center;

  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const HLine = styled.div`
  width: 1px;
  height: 1.5em;
  background-color: var(--gray-6);

  display: flex;
  align-self: center;
`
