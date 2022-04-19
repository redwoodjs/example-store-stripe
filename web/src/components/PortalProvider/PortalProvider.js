import { createPortal, unmountComponentAtNode } from 'react-dom'
import { useState } from 'react'

export const usePortal = () => {
  const el = document.getElementById('portal')

  const [portal, setPortal] = useState({
    render: () => null,
    remove: () => null,
  })

  const renderPortal = React.useCallback((el) => {
    const Portal = ({ children }) => createPortal(children, el)
    const remove = () => unmountComponentAtNode(el)
    return { render: Portal, remove }
  }, [])

  React.useEffect(() => {
    if (el) portal.remove()
    const newPortal = renderPortal(el)
    setPortal(newPortal)
    return () => newPortal.remove(el)
  }, [el])

  return portal.render
}
