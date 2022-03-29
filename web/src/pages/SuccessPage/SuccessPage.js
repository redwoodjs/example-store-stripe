import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SuccessPage = () => {
  return (
    <>
      <MetaTags title="Success" description="Success page" />

      <h1>SuccessPage</h1>
      <p>
        Find me in <code>./web/src/pages/SuccessPage/SuccessPage.js</code>
      </p>
      <p>
        My default route is named <code>success</code>, link to me with `
        <Link to={routes.success()}>Success</Link>`
      </p>
    </>
  )
}

export default SuccessPage
