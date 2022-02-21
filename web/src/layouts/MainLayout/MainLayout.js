import CartProvider from 'src/components/CartProvider'
import styled from 'styled-components'

import Logo from 'src/components/Logo'
import SiteWrapper from 'src/components/SiteWrapper'
import Cart from 'src/components/Cart'

const MainLayout = ({ children }) => {
  return (
    <CartProvider>
      <header>
        <SiteWrapper>
          <Row>
            <Logo />
            <Cart />
          </Row>
        </SiteWrapper>
      </header>

      <main>
        <SiteWrapper>{children}</SiteWrapper>
      </main>
    </CartProvider>
  )
}

export default MainLayout

// Styles

const Row = styled.div`
  display: flex;
  align-content: baseline;

  justify-content: space-between;

  border-bottom: solid #0a0a0a 1px;
`
