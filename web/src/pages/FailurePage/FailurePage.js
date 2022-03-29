import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const FailurePage = () => {
  return (
    <>
      <MetaTags title="Failure" description="Failure page" />

      <h1>FailurePage</h1>
      <p>
        Find me in <code>./web/src/pages/FailurePage/FailurePage.js</code>
      </p>
      <p>
        My default route is named <code>failure</code>, link to me with `
        <Link to={routes.failure()}>Failure</Link>`
      </p>
    </>
  )
}

export default FailurePage
