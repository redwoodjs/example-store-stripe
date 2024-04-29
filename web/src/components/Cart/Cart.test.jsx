import { render } from '@redwoodjs/testing/web'

import Cart from './Cart'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Cart', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Cart />)
    }).not.toThrow()
  })
})
