import { Link, routes } from '@redwoodjs/router'

import AuthButton from '../AuthButton/AuthButton'

const MainHeader = ({ portal }) => {
  return (
    <header>
      <Link to={routes.home()}>
        <h1>{'example store'}</h1>
      </Link>
      {!portal && <AuthButton />}
    </header>
  )
}

export default MainHeader
