export const schema = gql`
  type StripePrice {
    id: ID!
    active: Boolean
    currency: String
    nickname: String
    recurring: StripeRecurringPrice
    type: StripePriceType
    unit_amount: Int!
    product: String
  }

  type StripePriceVerbose {
    id: ID!
    active: Boolean
    currency: String
    nickname: String
    recurring: StripeRecurringPrice
    type: StripePriceType
    unit_amount: Int!
    product: StripeProduct
  }

  enum StripePriceType {
    one_time
    recurring
  }

  type StripeRecurringPrice {
    aggregate_usage: String
    interval: String
    interval_count: Int
    usage_type: String
  }

  type Query {
    stripePrices(priceType: StripePriceType): [StripePrice!]! @skipAuth
    stripePricesVerbose(priceType: StripePriceType): [StripePriceVerbose!]!
      @skipAuth
  }
`
