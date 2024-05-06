import { render } from '@redwoodjs/testing/web'

import RwsCart from './RwsCart'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RwsCart', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RwsCart />)
    }).not.toThrow()
  })
})
