import { render } from '@redwoodjs/testing/web'

import MainLayout from './MainLayout'

describe('MainLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MainLayout />)
    }).not.toThrow()
  })
})
