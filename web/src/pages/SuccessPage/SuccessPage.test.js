import { render } from '@redwoodjs/testing/web'

import SuccessPage from './SuccessPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SuccessPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SuccessPage />)
    }).not.toThrow()
  })
})
