import { useEffect } from 'react'

import {
  useStripeCustomerPortal,
  useStripeCustomer,
  // useStripeSubscriptions,
} from '@redwoodjs-stripe/web'
import { User } from 'react-feather'

import { routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button'

const AuthButton = (props) => {
  const { customer, retrieveStripeCustomer } = useStripeCustomer({
    retrieveFragment: gql`
      fragment CustomerSubscriptionFragment on StripeCustomer {
        id
        subscriptions {
          id
        }
        cash_balance {
          object
        }
      }
    `,
  })

  const { isAuthenticated, logOut } = useAuth()
  const {
    redirectToStripeCustomerPortal,
    createStripeCustomerPortalConfig,
    defaultConfig,
  } = useStripeCustomerPortal()

  useEffect(() => {
    // can use isAuthenticated
    if (customer?.id) {
      retrieveStripeCustomer(null, {
        expand: ['subscriptions', 'cash_balance'],
      }).then((r) => {
        console.log(r)
      })
    }
  }, [customer?.id, retrieveStripeCustomer])

  const onLogoutButtonClick = async () => {
    await logOut()
    toast.success("You've been successfully logged out")
  }

  const onUserButtonClick = async () => {
    try {
      const domain = process.env.DOMAIN_URL

      // Check whether default configuration exists
      if (defaultConfig) {
        await redirectToStripeCustomerPortal(
          {
            return_url: domain,
          },
          true
        )
      } else {
        // If there is no default config then create a new portal configuration
        // and use that configuration to  create a new stripe customer portal
        const config = await createStripeCustomerPortalConfig({
          business_profile: {
            headline: 'Superstore',
          },
          features: {
            customer_update: {
              enabled: true,
              allowed_updates: ['shipping', 'email', 'address', 'phone'],
            },
            invoice_history: {
              enabled: true,
            },
            subscription_cancel: {
              enabled: true,
              mode: 'immediately',
            },
            subscription_pause: {
              enabled: true,
            },
          },
        })
        await redirectToStripeCustomerPortal(
          {
            return_url: domain,
            configuration: config.id,
          },
          true
        )
      }
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
      <Button
        aria-label="Start billing portal session"
        variant="icon"
        onClick={onUserButtonClick}
        {...props}
      >
        <User style={{ color: 'var(--primary)' }} />
      </Button>
    </>
  )
}

export default AuthButton
