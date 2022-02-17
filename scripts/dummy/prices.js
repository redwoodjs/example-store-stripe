export const dummyPrices = [
  {
    currency: 'usd',
    unit_amount: 200,
    product_data: {
      id: 'prod_sp10X1Y2Z300bxvcx',
      name: 'Invisibility Test',
    },
  },
  {
    currency: 'usd',
    unit_amount: 350,
    product_data: {
      id: 'prod_sp20Z3Y2X100axvcx',
      name: 'Flight Test',
    },
  },

  // SUBSCRIPTIONS
  {
    currency: 'usd',
    unit_amount: 1000,
    product: 'prod_sp10X1Y2Z300bxvcx',
    recurring: {
      interval: 'month',
    },
  },
  {
    currency: 'usd',
    unit_amount: 1700,
    product: 'prod_sp20Z3Y2X100axvcx',
    recurring: {
      interval: 'month',
    },
  },
]
