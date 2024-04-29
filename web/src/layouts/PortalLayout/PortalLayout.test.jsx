import { render } from '@redwoodjs/testing/web'

import PortalLayout from './PortalLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PortalLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PortalLayout />)
    }).not.toThrow()
  })
})
