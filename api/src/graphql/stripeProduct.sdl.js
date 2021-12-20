export const schema = gql`
type StripeProduct {
  id: String!
  active: Boolean
  description: String
  name: String
  images: [String]
}
`
