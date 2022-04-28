import Grid from 'src/components/Grid'

import FailurePage from './FailurePage'

export const generated = () => {
  return <FailurePage />
}

export default {
  title: 'Pages/FailurePage',
  decorators: [
    (Story) => (
      <Grid>
        <Story />
      </Grid>
    ),
  ],
}
