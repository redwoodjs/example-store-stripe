import { render } from '@redwoodjs/testing/web'

import Spinner from './Spinner'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Spinner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Spinner />)
    }).not.toThrow()
  })
})
