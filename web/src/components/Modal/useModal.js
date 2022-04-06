import { createPortal, unmountComponentAtNode } from 'react-dom'
import { useState } from 'react'

const useModal = () => {
  const el = document.getElementById('modal-wrapper')
  const [portal, setPortal] = useState({
    render: () => null,
    remove: () => null,
  })

  const createModal = React.useCallback((el) => {
    const Portal = ({ children }) => createPortal(children, el)
    const remove = () => unmountComponentAtNode(el)
    return { render: Portal, remove }
  }, [])

  React.useEffect(() => {
    if (el) portal.remove()
    const newModal = createModal(el)
    setPortal(newModal)
    return () => newModal.remove(el)
  }, [el])

  return portal.render
}

export default useModal
