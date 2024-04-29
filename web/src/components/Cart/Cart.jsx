import { useStripeCart } from '@redwoodjs-stripe/web'

import styles from './styles.css?inline'

const Cart = ({ isCartVisible, onCartButtonClick }) => {
  return (
    <button
      className={styles.rwsButton}
      onClick={onCartButtonClick}
      data-active={isCartVisible}
    >
      Cart
      <CartCounter />
    </button>
  )
}

const CartCounter = () => {
  const { cart } = useStripeCart()
  const count = cart.reduce((prev, cur) => prev + cur.quantity, 0)
  return count > 0 ? <span className={styles.rwsCounter}>{count}</span> : null
}

export default Cart
