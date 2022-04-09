import { routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'
import { User } from 'react-feather'
import styled from 'styled-components'

import Button from 'src/components/Button'

const AuthButton = (props) => {
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

  const onLogoutButtonClick = async () => {
    await logOut()
    toast.success("You've been successfully logged out")
  }

  const onUserButtonClick = async () => {
    // create portal session to get temp url
    const session = currentUser
    try {
      const {
        data: {
          portal: { url },
        },
      } = await portal({
        variables: { userId: session.id },
      })
      // redirect user to Stripe customer portal
      window.location.replace(url)
    } catch (e) {
      toast.error("Couldn't create a session at this time")
    }
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <Button onClick={onLogoutButtonClick} {...props}>
            Log out
          </Button>
          <Button variant="transparent" onClick={onUserButtonClick} {...props}>
            <StyledUser />
          </Button>
        </>
      ) : (
        <Button to={routes.login()} {...props}>
          Log in
        </Button>
      )}
    </>
  )
}

export default AuthButton

// Styles

const StyledUser = styled(User)`
  color: var(--primary);
`
