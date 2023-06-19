import gql from 'graphql-tag'

import { useMutation } from '@redwoodjs/web'

const useStripeId = () => {
  // Fetch and store Stripe id to db
  const [addStripeId] = useMutation(
    gql`
      mutation addStripeId($id: ID!) {
        addStripeId(id: $id) {
          id
          stripeId
        }
      }
    `
  )

  return {
    addStripeId: async (userId) => {
      // mutation code
      const payload = {
        variables: {
          id: userId,
        },
      }

      const { data } = await addStripeId(payload)
      return data
    },
  }
}

export default useStripeId
