export const dummyPrices = [
  {
    currency: 'usd',
    unit_amount: 200,
    product_data: {
      id: 'prod_sp10X1Y2Z3001xvcx',
      name: 'Invisibility',
    },
  },
  {
    currency: 'usd',
    unit_amount: 350,
    product_data: {
      id: 'prod_sp20Z3Y2X1002xvcx',
      name: 'Flight',
    },
  },

  // SUBSCRIPTIONS
  {
    currency: 'usd',
    unit_amount: 1000,
    product: 'prod_sp10X1Y2Z3001xvcx',
    recurring: {
      interval: 'month',
    },
  },
  {
    currency: 'usd',
    unit_amount: 1700,
    product: 'prod_sp20Z3Y2X1002xvcx',
    recurring: {
      interval: 'month',
    },
  },
]
