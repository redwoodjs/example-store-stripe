import { render } from '@redwoodjs/testing/web'

import StripeCartPage from './StripeCartPage'

describe('StripeCartPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StripeCartPage />)
    }).not.toThrow()
  })
})
