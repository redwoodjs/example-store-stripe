import { useStripeCart, useStripeCheckout } from '@redwoodjs-stripe/web'

const CartDropdown = () => {
  const { checkout } = useStripeCheckout()
  const { cart, clearCart } = useStripeCart()

  const onCheckoutButtonClick = async () => {
    // Update the successUrl to change the page that the user goes to after checking out
    await checkout({
      cart: cart,
      successUrl:
        'http://localhost:8910/stripe-demo?success=true&sessionId={CHECKOUT_SESSION_ID}',
      cancelUrl: 'http://localhost:8910/stripe-demo?success=false',
    })
  }

  const onClearCartButtonClick = () => {
    clearCart()
  }

  const totalPrice = cart.reduce(
    (prev, cur) => prev + cur.price * cur.quantity,
    0
  )

  return (
    <ul className="rws-cart__list">
      {cart.length === 0 && (
        <li className="rws-cart__list__item">
          <p>looks like you need to add things to your cart</p>
        </li>
      )}
      {cart.map((item) => (
        <StripeCartItem key={`stripe-cart-item-${item.id}`} {...item} />
      ))}
      {cart.length > 0 && (
        <>
          <li className="rws-cart__list__item--border">
            <p>
              total:{' '}
              {(totalPrice / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </li>

          <li className="rws-cart__actions ">
            <button
              className="rws-button--bordered"
              onClick={onCheckoutButtonClick}
            >
              Checkout
            </button>
            <button
              className="rws-button--bordered"
              onClick={onClearCartButtonClick}
            >
              Clear Cart
            </button>
          </li>
        </>
      )}
    </ul>
  )
}

const StripeCartItem = ({ name, price, quantity }) => {
  return (
    <li className="rws-cart__list__item">
      <p>{name}</p>
      <p>
        {(price / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </p>
      <p>qty: {quantity}</p>
    </li>
  )
}

export default CartDropdown
