import { render } from '@redwoodjs/testing/web'

import PageBody from './PageBody'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PageBody', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PageBody />)
    }).not.toThrow()
  })
})
