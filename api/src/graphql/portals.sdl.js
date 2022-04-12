export const schema = gql`
  type BillingPortalSession {
    id: String!
    url: String!
  }

  type Mutation {
    createBillingPortalSession(userId: ID!): BillingPortalSession! @requireAuth
  }
`
