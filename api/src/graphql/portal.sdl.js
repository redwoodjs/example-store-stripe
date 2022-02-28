export const schema = gql`
  type Session {
    id: String!
    url: String!
  }

  type Mutation {
    # In GraphQL, we can't reuse types as mutation inputs
    portal(userId: ID!): Session! @requireAuth
  }
`
