import { render } from '@redwoodjs/testing/web'

import CartDropdown from './CartDropdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CartDropdpwn', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CartDropdown />)
    }).not.toThrow()
  })
})
