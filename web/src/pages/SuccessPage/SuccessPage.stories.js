import Grid from 'src/components/Grid'

import SuccessPage from './SuccessPage'

export const generated = () => {
  return <SuccessPage />
}

export default {
  title: 'Pages/SuccessPage',
  decorators: [
    (Story) => (
      <Grid>
        <Story />
      </Grid>
    ),
  ],
}
