export const schema = gql`
type StripePrice {
  id: String!
  active: Boolean
  currency: String
  nickname: String
  recurring: StripeRecurringPrice
  type: String
  unit_amount: Int!
  product: String
}

type StripeRecurringPrice {
  aggregate_usage: String
  interval: String
  interval_count: Int
  usage_type: String
}

type Query {
  stripePrices(priceType: String): [StripePrice!]! @skipAuth
}`
