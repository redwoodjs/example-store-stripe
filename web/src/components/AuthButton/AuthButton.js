import { User } from 'react-feather'

import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

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

  if (!isAuthenticated) {
    return (
      <Button variant="link" to={routes.login()} {...props}>
        Log in
      </Button>
    )
  }

  return (
    <>
      <Button onClick={onLogoutButtonClick} {...props}>
        Log out
      </Button>
      <Button variant="icon" onClick={onUserButtonClick} {...props}>
        <User style={{ color: 'var(--primary)' }} />
      </Button>
    </>
  )
}

export default AuthButton
