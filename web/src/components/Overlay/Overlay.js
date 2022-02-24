import styled from 'styled-components'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const overlayRoot = document.getElementById('overlay-root')

const Overlay = ({ children }) => {
  const el = document.createElement('div')

  useEffect(() => {
    overlayRoot.appendChild(el)

    return function cleanup() {
      overlayRoot.removeChild(el)
    }
  })
  return createPortal(<Wrapper>{children}</Wrapper>, el)
}

export default Overlay

const Wrapper = styled.div`
   {
    width: 50px;

    z-index: 1500;
    background-color: rgba(0, 0, 0, 0.5);
  }
`
