export const schema = gql`
  type User {
    id: ID!
    email: String! @requireAuth
    name: String
    stripeId: String
  }

  type Mutation {
    updateStripeId(id: ID!): User @requireAuth
    addStripeId(id: ID!): User @requireAuth
  }

  type Query {
    getCustomerId(id: ID!): String! @requireAuth
    getCustomerEmail(id: ID!): String @requireAuth
  }
`
