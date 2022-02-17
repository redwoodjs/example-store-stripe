export const schema = gql`
  scalar URL

  type Product {
    id: ID!
    name: String!
    description: String!
    images: [URL!]!
    price: Int!
    priceId: ID!
  }

  type Query {
    products: [Product!]! @skipAuth
  }
`
