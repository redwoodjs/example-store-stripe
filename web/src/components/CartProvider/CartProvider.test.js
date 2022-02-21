import { render } from '@redwoodjs/testing/web'

import CartProvider from './CartProvider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CartProvider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CartProvider />)
    }).not.toThrow()
  })
})
