import styled from 'styled-components'

import { useEffect, useState, createContext } from 'react'
import { createPortal } from 'react-dom'

const Overlay = () => {
  const isVisible = useOverlayVisibility()
  const OverlayContext = createContext(isVisible)
  return (
    <>
      <div id="overlay-root"></div>
      {isVisible && (
        <OverlayPortal>
          <p>derp</p>
        </OverlayPortal>
      )}
    </>
  )
}

const useOverlayVisibility = (v = false) => {
  const [isVisible, setVisibility] = useState(v)

  setVisibility(!isVisible)
  return isVisible
}

const OverlayPortal = ({ children }) => {
  const overlayRoot = document.getElementById('overlay-root')
  const el = document.createElement('div')

  useEffect(() => {
    overlayRoot.appendChild(el)

    return function cleanup() {
      overlayRoot.removeChild(el)
    }
  })
  return createPortal(
    <Wrapper>
      {children}
      <button onClick={useOverlayVisibility(useOverlayVisibility())}>
        close
      </button>
    </Wrapper>,
    el
  )
}

export default Overlay

const Wrapper = styled.div`
   {
    width: 50px;

    z-index: 1500;
    background-color: rgba(0, 0, 0, 0.5);
  }
`
