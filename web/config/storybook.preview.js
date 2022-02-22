/* eslint-disable react/react-in-jsx-scope */
import GlobalStyles from 'src/components/GlobalStyles'

export const decorators = [
  (Story) => (
    <>
      <Story />
      <GlobalStyles />
    </>
  ),
]
