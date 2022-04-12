import { User } from 'react-feather'

import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button'

const AuthButton = (props) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()

  const onLogoutButtonClick = async () => {
    await logOut()
    toast.success("You've been successfully logged out")
  }

  const [createBillingPortalSession] = useMutation(
    gql`
      mutation CreateBillingPortalSession($userId: ID!) {
        createBillingPortalSession(userId: $userId) {
          url
        }
      }
    `
  )

  // Create a billing portal session for the current user.
  const onUserButtonClick = async () => {
    try {
      const {
        data: {
          createPortal: { url },
        },
      } = await createBillingPortalSession({
        variables: { userId: currentUser.id },
      })

      window.location.assign(url)
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
          <Button variant="icon" onClick={onUserButtonClick} {...props}>
            <User style={{ color: 'var(--primary)' }} />
          </Button>
        </>
      ) : (
        <Button variant="link" to={routes.login()} {...props}>
          Log in
        </Button>
      )}
    </>
  )
}

export default AuthButton
