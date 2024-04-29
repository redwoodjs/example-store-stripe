import Page from 'src/components/Page/Page'

const PortalLayout = ({ children }) => {
  return <Page portal={true}>{children}</Page>
}

export default PortalLayout
