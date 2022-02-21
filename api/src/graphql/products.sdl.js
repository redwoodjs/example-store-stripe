export const schema = gql`
  scalar URL

  type Product {
    id: ID!
    name: String!
    description: String!
    images: [URL!]!
    price: Int!
    productId: ID!
    type: String
  }

  type Query {
    products: [Product!]! @skipAuth
  }
`
