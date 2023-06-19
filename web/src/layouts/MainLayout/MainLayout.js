import { useState, useEffect } from 'react'

import { StripeProvider } from '@redwoodjs-stripe/web'
import styled from 'styled-components'

import { useAuth } from 'src/auth'
import AuthButton from 'src/components/AuthButton'
import Branding from 'src/components/Branding/Branding'
import Cart from 'src/components/Cart'
import Footer from 'src/components/Footer'
import Grid from 'src/components/Grid'
import useStripeId from 'src/lib/useStripeId'

const MainLayout = ({ children }) => {
  /*
    Passing the authenticated user to StripeProvider for use for Stripe Checkout and Stripe Portals
    User needs to manage authentication of customers
  */
  const { getCurrentUser, isAuthenticated } = useAuth()
  const { addStripeId } = useStripeId()
  const [customer, setCustomer] = useState('')

  useEffect(() => {
    // Gets Stripe Customer ID if email is linked to a Stripe Customer email.
    // If not then a new Stripe Customer is created with email address and
    // Stripe Customer is returned. Logic lives on the api side
    const getUserStripeId = async () => {
      const { id, stripeId } = await getCurrentUser()
      if (!stripeId) {
        const user = await addStripeId(id)
        return user.stripeId
      }
      return stripeId
    }

    ;(async () => {
      // Check if user is authenticated
      if (isAuthenticated && customer === '') {
        const customerId = await getUserStripeId().then((stripeCustomerId) => {
          return stripeCustomerId
        })
        setCustomer(customerId)
      } else if (!isAuthenticated && customer !== '') {
        setCustomer('')
      }
    })()
  }, [isAuthenticated, getCurrentUser, addStripeId, customer])

  return (
    <StripeProvider customer={{ id: customer }}>
      <Grid>
        <Header>
          {/* Push the other flex items all the way to the right. */}
          <Branding style={{ marginRight: 'auto' }} />
          <AuthButton />
          <HLine />
          <Cart />
        </Header>
        {children}
        <Footer />
      </Grid>
    </StripeProvider>
  )
}

export default MainLayout

// Styles

const Header = styled.header`
  /*
      This is relative for its after pseudo-element.
    */
  position: relative;

  /*
    Asymmetrical padding for optical alignment.
   */
  padding-bottom: var(--size-4);

  display: flex;
  justify-content: space-between;

  /*
    This one's a little tricky,
    but right now center (instead of baseline) seems to give the best results.
  */
  align-items: center;
  & > :not(:first-child) {
    transform: translateY(var(--size-1));
  }
  /*
    The gradient border below the header.
  */
  &:after {
    content: '';
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: calc(var(--padding) / 2);
    background-image: var(--brand-gradient);
  }
`

const HLine = styled.div`
  width: 1px;
  height: 25%;
  background-color: var(--gray-6);
`
