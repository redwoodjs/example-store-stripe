import Grid from 'src/components/Grid'

import {
  Loading,
  // Empty,
  Failure,
  Success,
} from './ProductsCell'
import { standard } from './ProductsCell.mock'

export const loading = () => {
  return <Loading />
}

// export const empty = () => {
//   return <Empty />
// }

export const failure = () => {
  return <Failure error={new Error('Oh no')} />
}

export const success = () => {
  return <Success {...standard()} />
}

export default {
  title: 'Cells/ProductsCell',
  decorators: [
    (Story) => (
      <Grid>
        <Story />
      </Grid>
    ),
  ],
}
