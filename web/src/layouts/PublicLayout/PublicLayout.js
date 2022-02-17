import CartProvider from 'src/components/CartProvider'
import styled from 'styled-components'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import SiteWrapper from 'src/components/SiteWrapper'
import Cart from 'src/components/Cart'

const PublicLayout = ({ children }) => {
  return (
    <>
      <MetaTags
        title="The Farm Stall"
        description="Proof of Concept for the Redwood + Stripe integration package"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />
      <CartProvider>
        <Header>
          <SiteWrapper>
            <Row>
              <Link to={routes.home()}>
                <h1>SuperPOW!!!</h1>
              </Link>
              <Cart />
            </Row>
          </SiteWrapper>
        </Header>

        <main>
          <SiteWrapper>{children}</SiteWrapper>
        </main>
      </CartProvider>
    </>
  )
}

export default PublicLayout

// Styles

const Header = styled.header`
  & a {
    color: #0a0a0a;
    text-decoration: none;
  }

  & h1 {
    margin: 0.5em 0;
  }
`

const Row = styled.div`
  display: flex;
  align-content: baseline;

  justify-content: space-between;

  border-bottom: solid #0a0a0a 1px;
`
