import { render } from '@redwoodjs/testing/web'

import Page from './Page'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Page', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Page />)
    }).not.toThrow()
  })
})
