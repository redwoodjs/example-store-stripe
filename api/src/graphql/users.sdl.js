export const schema = gql`
  type User {
    id: ID!
    email: String!
    name: String
  }

  type Query {
    getCustomerId(id: ID!): String! @requireAuth
  }
`
