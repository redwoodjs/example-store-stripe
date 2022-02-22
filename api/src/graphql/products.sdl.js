export const schema = gql`
  scalar URL

  type Product {
    id: ID!
    name: String!
    description: String!
    image: URL!
    price: Int!
    type: String!
  }

  enum ProductType {
    one_time
    recurring
  }

  type Query {
    products(type: ProductType): [Product!]! @skipAuth
  }
`
