import { render } from '@redwoodjs/testing/web'

import PublicLayout from './PublicLayout'

describe('PublicLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PublicLayout />)
    }).not.toThrow()
  })
})
