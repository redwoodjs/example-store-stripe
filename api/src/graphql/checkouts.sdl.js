export const schema = gql`
  type Session {
    id: String!
  }

  type Mutation {
    createCheckoutSession(mode: String!): Session! @skipAuth
  }
`
