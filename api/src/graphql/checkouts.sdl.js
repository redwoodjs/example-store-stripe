export const schema = gql`
  type Session {
    id: String!
    customerId: String
    customerEmail: String
    customerName: String
    customerSignedUp: Boolean
  }

  enum Mode {
    payment
    subscription
  }

  input ProductInput {
    id: ID!
    quantity: Int!
  }
`
