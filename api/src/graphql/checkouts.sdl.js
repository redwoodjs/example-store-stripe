export const schema = gql`
  type CheckoutSession {
    id: ID!
    customerId: ID
    customerEmail: String
    customerName: String
    customerSignedUp: Boolean!
  }

  enum Mode {
    payment
    subscription
  }

  type PaymentIntent {
    clientSecret: String!
  }

  input CartItem {
    id: ID!
    quantity: Int!
  }

  type Query {
    getCheckoutSession(id: ID!): CheckoutSession! @skipAuth
  }

  type Mutation {
    createCheckoutSession(
      mode: Mode!
      # In GraphQL, we can't reuse types as mutation inputs.
      # (Otherwise we'd just type "cart" as "[Product!]!")
      cart: [CartItem!]!
      customerId: ID
    ): CheckoutSession! @skipAuth

    createPaymentIntent(
      mode: Mode
      # In GraphQL, we can't reuse types as mutation inputs.
      # (Otherwise we'd just type "cart" as "[Product!]!")
      cart: [CartItem]
      customerId: ID
    ): PaymentIntent! @skipAuth
  }
`
