import { render } from '@redwoodjs/testing/web'

import AuthButton from './AuthButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AuthButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthButton />)
    }).not.toThrow()
  })
})
