import styled from 'styled-components'

const Modal = () => {
  return <Wrapper id="modal-wrapper">I am Modal</Wrapper>
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
