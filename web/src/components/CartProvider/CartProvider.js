import { createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import { toast } from '@redwoodjs/web/toast'

/**
 * @param {Array<{ priceId: string, quantity: number }>} cart
 * @param {{ type: string, priceId: string }} action
 */
const cartReducer = (cart, action) => {
  const product = cart.find((product) => product.priceId === action.priceId)

  switch (action.type) {
    case 'added': {
      if (product) {
        product.quantity += 1
      } else {
        cart.push({ priceId: action.priceId, quantity: 1 })
      }
      toast('added')
      break
    }
    case 'removed': {
      if (product) {
        product.quantity -= 1
      } else {
        cart = cart.filter((priceId) => priceId !== action.priceId)
      }
      toast('removed')
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

const useAddToCart = (priceId) => {
  const dispatch = useContext(CartDispatchContext)
  return () => dispatch({ type: 'added', priceId })
}

const useRemoveFromCart = (priceId) => {
  const dispatch = useContext(CartDispatchContext)
  return () => dispatch({ type: 'removed', priceId })
}

export { useCart, useAddToCart, useRemoveFromCart }
