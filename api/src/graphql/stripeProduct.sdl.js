export const schema = gql`
  type StripeProduct {
    id: ID!
    active: Boolean
    description: String
    name: String!
    object: String
    created: String
    images: [String]
    livemode: Boolean
    statement_descriptor: String
    tax_code: String
    unit_label: String
    updated: String
    url: String
  }
`
