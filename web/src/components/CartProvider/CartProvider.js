import { createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import { toast } from '@redwoodjs/web/toast'

/**
 * @param {Array<{ id: string, quantity: number }>} cart
 * @param {{ type: string, id: string }} action
 */
const cartReducer = (cart, action) => {
  const product = cart.find((product) => product.id === action.id)

  switch (action.type) {
    case 'added': {
      if (product) {
        product.quantity += 1
      } else {
        cart.push({ id: action.id, quantity: 1 })
      }
      toast.success('Added to cart')
      break
    }
    case 'removed': {
      if (product) {
        product.quantity -= 1
      } else {
        cart = cart.filter((id) => id !== action.id)
      }
      toast.success('Removed from cart')
      break
    }
  }
}

const CartContext = createContext(null)

const CartDispatchContext = createContext(null)

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useImmerReducer(cartReducer, [])

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

export default CartProvider

// Hooks

const useCart = () => useContext(CartContext)

const useAddToCart = (id) => {
  const dispatch = useContext(CartDispatchContext)
  return () => dispatch({ type: 'added', id })
}

const useRemoveFromCart = (id) => {
  const dispatch = useContext(CartDispatchContext)
  return () => dispatch({ type: 'removed', id })
}

export { useCart, useAddToCart, useRemoveFromCart }
