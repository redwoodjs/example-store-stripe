import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { usePortal } from 'src/components/PortalProvider'

import Button from 'src/components/Button'

const Modal = ({ children, visibility = false }) => {
  const [isVisible, toggleVisibility] = useState(visibility)

  const ModalPortal = usePortal()

  useEffect(() => {
    toggleVisibility(visibility)
  }, [visibility])

  return isVisible ? (
    <ModalPortal>
      <Wrapper>
        <div>
          <Button variant="primary" onClick={toggleVisibility(false)}>
            X
          </Button>
        </div>
        {children}
      </Wrapper>
    </ModalPortal>
  ) : null
}

export default Modal

const Wrapper = styled.div`
  background: var(--primary-tint);
  border-radius: 0.5em;
  padding: var(--padding);
  box-shadow: var(--shadow);

  position: absolute;
  top: 100px;
  left: 100px;
`
