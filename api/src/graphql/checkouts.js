export const schema = gql`
  type Session {
    id: String!
  }

  enum StripeMode {
    payment
    subscription
    setup
  }

  type Mutation {
    createCheckoutSession(mode: StripeMode!): Session! @skipAuth
  }
`
