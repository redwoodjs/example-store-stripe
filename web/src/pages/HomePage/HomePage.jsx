import { useState } from 'react'

import { StripeProvider } from '@redwoodjs-stripe/web'

import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import CartButton from 'src/components/Cart/Cart'
import Cart from 'src/components/CartDropdown/CartDropdown'
import StripeItemsCell from 'src/components/StripeItemsCell/StripeItemsCell'

const HomePage = () => {
  const [isCartVisible, setCartVisibilty] = useState(false)

  /*
  USERMAPPING
  Alternative 1: Uses the 'email' saved at sign up to find Stripe Customer (Easiest, less secure - exposes more data "email")
  Alternative 2: Uses the 'stripeId' fetched at sign up (More difficult, more secure, more efficient)
  */
  const { isAuthenticated, currentUser } = useAuth()

  const onCartButtonClick = () => {
    setCartVisibilty(!isCartVisible)
  }

  return (
    <>
      {/*
        We are creating a single page store, if we had
        multiple pages like a product page the provider would be found in a "StoreLayout"
      */}
      <StripeProvider
        customer={{
          id:
            isAuthenticated && currentUser?.stripeId !== undefined
              ? currentUser.stripeId
              : '',
        }}
      >
        <Metadata title="Home" description="Home page" />

        {/* Stripe Checkout is managed inside of the Cart component */}
        <CartButton
          isCartVisible={isCartVisible}
          onCartButtonClick={onCartButtonClick}
        />
        {isCartVisible && <Cart />}

        <div>Products</div>
        <StripeItemsCell
          params={{
            productParams: { active: true },
            priceParams: { type: 'one_time' },
          }}
        />
      </StripeProvider>
    </>
  )
}

export default HomePage
