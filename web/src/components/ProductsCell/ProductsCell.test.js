import { StripeProvider, useStripeCart } from '@redwoodjs-stripe/web'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './ProductsCell'
import { standard } from './ProductsCell.mock'

describe('ProductsCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully and clicking products adds them to the cart', async () => {
    const { stripeItems } = standard()

    const Quantity = () => {
      const { cart } = useStripeCart()
      const quantity = cart.reduce((total, item) => total + item.quantity, 0)
      return <div data-testid="cart">{quantity}</div>
    }

    const { user } = setup(
      <StripeProvider>
        <Success stripeItems={stripeItems} />
        <Quantity />
      </StripeProvider>
    )

    for (const item of stripeItems) {
      const productEl = screen.getByText(item.name)
      expect(productEl).toBeInTheDocument()
      await user.click(productEl)
    }

    expect(screen.getByTestId('cart')).toHaveTextContent(stripeItems.length)
  })
})

// See https://testing-library.com/docs/user-event/intro#writing-tests-with-userevent
function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}
