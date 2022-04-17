import styled from 'styled-components'

import { useAuth } from '@redwoodjs/auth'
import { routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button'

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
          <Button onClick={onLogoutButtonClick}>Log Out</Button>
          <Button onClick={onUserButtonClick} icon="user" />
        </>
      ) : (
        <Button to={routes.login()}>Log In</Button>
      )}
      <HLine />
    </>
  )
}

export default AuthButton

// Styles
const HLine = styled.div`
  width: 1px;
  height: var(--size-5);
  background-color: var(--gray-6);

  display: flex;
  align-self: center;
`
