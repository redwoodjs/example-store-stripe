export const schema = gql`
  type StripeCheckoutSession {
    id: ID!
    cancel_url: String
    client_reference_id: String
    currency: String
    customer: String
    customer_email: String
    line_items: [StripeLineItem]
    mode: StripeMode
  }

  type StripeLineItem {
    object: String
    data: [StripeLineItemData]
    has_more: Boolean
    url: String
  }

  type StripeLineItemData {
    id: String
    object: String
    amount_integer: Int
    amount_total: Int
    currency: String
    description: String
    discounts:[]
    price: StripePrice
    quantity: Int
    taxes: [StripeLineItemTax]
  }

  type StripeLineItemTax {
    amount: Int
    rate: StripeLineItemTaxRate
  }

  type StripeLineItemTaxRate {

  }

  enum StripeMode {
    payment
    subscription
    setup
  }
`
