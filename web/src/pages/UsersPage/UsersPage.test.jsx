import { render } from '@redwoodjs/testing/web'

import UsersPage from './UsersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UsersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UsersPage />)
    }).not.toThrow()
  })
})
