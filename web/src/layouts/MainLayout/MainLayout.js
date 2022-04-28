import styled from 'styled-components'

import AuthButton from 'src/components/AuthButton'
import Branding from 'src/components/Branding/Branding'
import Cart from 'src/components/Cart'
import Footer from 'src/components/Footer'

const MainLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        {/* Push the other flex items all the way to the right. */}
        <Branding style={{ marginRight: 'auto' }} />
        <AuthButton />
        <HLine />
        <Cart />
      </Header>
      {children}
      <Footer />
    </Wrapper>
  )
}

export default MainLayout

// Styles

const Wrapper = styled.div`
  /*
    Better than 100vh; doesn't cause a scrollbuglar on mobile.
  */
  height: 100%;

  /*
    On the home page, there's a scroll bar, but on the login page, there isn't.
    This dynamically adjusts the padding on the left of the grid so that it doesn't move.
    See https://stackoverflow.com/a/30293718.
  */
  padding-left: calc(100vw - 100%);

  display: grid;
  row-gap: calc(var(--padding) * 2);

  /*
    The min function takes two values and returns the smaller of them.
    Since one's dynamic (calc), that'll be smaller on small screens.
    We subtract from it so that things don't go all the way to the edge.
  */
  grid-template-columns:
    1fr
    min(var(--size-md), calc(100% - var(--padding) * 2))
    1fr;

  /*
    We don't want the <header> to grow on the login page.
  */
  grid-template-rows: var(--size-11) 1fr;

  /*
    Center all the grid's direct children.
  */
  & > * {
    grid-column: 2;
  }
`

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
