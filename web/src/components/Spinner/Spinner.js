import styled, { keyframes } from 'styled-components'

import SpinnerSVG from './spinner.svg'

const turn = keyframes`
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
`

const Spinner = styled(SpinnerSVG)`
  animation: ${turn} 1000ms linear infinite;
`

export default Spinner
