import { render } from '@redwoodjs/testing/web'

import Elements from './Elements'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Elements', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Elements />)
    }).not.toThrow()
  })
})
