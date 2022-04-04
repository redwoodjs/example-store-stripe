import { MetaTags } from '@redwoodjs/web'
import Shield from './shield.svg'

const SuccessPage = () => {
  return (
    <>
      <MetaTags title="Success" description="Success page" />

      <h1>Thank you!!</h1>
      <p>Have a SUPER day!!!</p>
      <Shield />
    </>
  )
}

export default SuccessPage
