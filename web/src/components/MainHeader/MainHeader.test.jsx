import { render } from '@redwoodjs/testing/web'

import MainHeader from './MainHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MainHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MainHeader />)
    }).not.toThrow()
  })
})
