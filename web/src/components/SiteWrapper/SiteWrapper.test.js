import { render } from '@redwoodjs/testing/web'

import SiteWrapper from './SiteWrapper'

describe('SiteWrapper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SiteWrapper />)
    }).not.toThrow()
  })
})
