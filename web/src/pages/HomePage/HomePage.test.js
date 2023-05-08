import { StripeProvider } from '@redwoodjs-stripe/web'
import userEvent from '@testing-library/user-event'

import { screen, render } from '@redwoodjs/testing/web'

import MainLayout from 'src/layouts/MainLayout'

import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })

  it('clicking products adds them to the cart', async () => {
    const { user } = setup(
      <StripeProvider>
        <MainLayout>
          <HomePage />
        </MainLayout>
      </StripeProvider>
    )

    const productEl = await screen.findByText('Folding')
    await user.click(productEl)

    const cartButton = screen.getByLabelText('Open cart')
    expect(cartButton.dataset.quantity).toBe('1')
  })
})

// See https://testing-library.com/docs/user-event/intro#writing-tests-with-userevent
function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}
