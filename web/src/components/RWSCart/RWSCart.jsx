import { useState } from 'react'

import { useStripeCart } from '@redwoodjs-stripe/web'

import styles from './styles.module.css'

const RwsCart = () => {
  const [isCartVisible, setCartVisibilty] = useState(false)
  const { cart } = useStripeCart()
  const count = cart.reduce((prev, cur) => prev + cur.quantity, 0)
  const visCount = count > 0 ? count : null

  const onCartButtonClick = () => {
    setCartVisibilty(!isCartVisible)
  }

  return (
    <button
      className={styles.rwsButton}
      onClick={onCartButtonClick}
      data-active={isCartVisible}
      data-counter={visCount}
    >
      Cart
    </button>
  )
}

// const CartCounter = () => {
//   const { cart } = useStripeCart()
//   const count = cart.reduce((prev, cur) => prev + cur.quantity, 0)
//   return count > 0 ? <span className={styles.rwsCounter}>{count}</span> : null
// }

export default RwsCart
