// import userEvent from '@testing-library/user-event'

import { render, screen } from '@redwoodjs/testing/web'

import AuthButton from './AuthButton'

describe('AuthButton', () => {
  it("renders Log in when the user's unauthenticated", () => {
    render(<AuthButton />)

    expect(screen.getByText('Log in')).toBeInTheDocument()
  })

  it("renders Log out when the user's authenticated", async () => {
    mockCurrentUser({ id: 'cus_42' })

    render(<AuthButton />)

    expect(await screen.findByText('Log out')).toBeInTheDocument()
  })

  // it('redirects to billing portal session', async () => {
  //   mockCurrentUser({ id: 'cus_42' })

  //   mockGraphQLMutation('Portal', (variables) => {
  //     return {
  //       portal: {
  //         url: `localhost:8910/${variables.userId}`,
  //       },
  //     }
  //   })

  //   const user = userEvent.setup()
  //   render(<AuthButton />)

  //   const userButton = await screen.findByLabelText(
  //     'Start billing portal session'
  //   )

  //   await user.click(userButton)
  // })
})
