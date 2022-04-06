import { render } from '@redwoodjs/testing/web'

import FailurePage from './FailurePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FailurePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FailurePage />)
    }).not.toThrow()
  })
})
