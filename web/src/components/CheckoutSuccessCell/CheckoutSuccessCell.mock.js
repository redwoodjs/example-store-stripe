// Define your own mock data here:
export const standard = () => ({
  retrieveStripeCheckoutSession: {
    id: 'cus_42',
    customer: {
      name: 'Redwood Cone',
      email: 'cone@redwoodjs.com',
    },
  },
  isSignedUp: false,
})
