import { Metadata } from '@redwoodjs/web'

import UsersCell from 'src/components/UsersCell/UsersCell'

const UsersPage = () => {
  return (
    <>
      <Metadata title="Users" description="Users page" />

      <h1>Users</h1>
      <UsersCell />
    </>
  )
}

export default UsersPage
