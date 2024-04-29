import MainFooter from '../MainFooter/MainFooter'
import MainHeader from '../MainHeader/MainHeader'
import PageBody from '../PageBody/PageBody'

const Page = ({ children, portal = false }) => {
  return (
    <div className="page">
      <MainHeader portal={portal} />
      <PageBody>{children}</PageBody>
      <MainFooter />
    </div>
  )
}

export default Page
