export const schema = gql`
  type User {
    id: ID!
    email: String!
    customerId: String
    name: String
  }

  type Query {
    getCustomerId(id: ID!): String! @requireAuth
  }
`
