import { render } from '@redwoodjs/testing/web'

import MainFooter from './MainFooter'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MainFooter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MainFooter />)
    }).not.toThrow()
  })
})
