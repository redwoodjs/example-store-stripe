export const dummyPrices = [
  {
    createPrice: {
      currency: 'usd',
      unit_amount: 200,
      product_data: {
        name: 'Invisibility',
      },
    },
    updateProduct: {
      images: ['img/invisibility.png'],
      description:
        'Become invisible in the blink of an eye and avoid all those pesky people. Warning: Overuse might cause one to feel transparent and lost',
    },
  },
  {
    createPrice: {
      currency: 'usd',
      unit_amount: 350,
      product_data: {
        name: 'Flight',
      },
    },
    updateProduct: {
      images: ['img/flight.png'],
      description:
        'Be able to fly up to 50m into sky and reach a maximum speed of 180km/h.',
    },
  },
  {
    createPrice: {
      currency: 'usd',
      unit_amount: 500,
      product_data: {
        name: 'Folding',
      },
    },
    updateProduct: {
      images: ['img/folding.png'],
      description:
        'Be able to fold anything in the universe, whether it be laundry or space itself. Disclaimer: May cause a rip in the space-time continuum if used improperly.',
    },
  },

  // SUBSCRIPTIONS
  {
    createPrice: {
      currency: 'usd',
      unit_amount: 1000,
      product_data: {
        name: 'Invisibility Subscription',
      },
      recurring: {
        interval: 'month',
      },
    },
    updateProduct: {
      images: ['img/invisibility.png'],
      description:
        'Become invisible in the blink of an eye and avoid all those pesky people. Warning: Overuse might cause one to feel transparent and lost',
    },
  },
  {
    createPrice: {
      currency: 'usd',
      unit_amount: 1700,
      product_data: {
        name: 'Flight Subscription',
      },
      recurring: {
        interval: 'month',
      },
    },
    updateProduct: {
      images: ['img/flight.png'],
      description:
        'Be able to fly up to 50m into sky and reach a maximum speed of 180km/h.',
    },
  },
  {
    createPrice: {
      currency: 'usd',
      unit_amount: 3500,
      product_data: {
        name: 'Folding Subscription',
      },
      recurring: {
        interval: 'month',
      },
    },
    updateProduct: {
      images: ['img/folding.png'],
      description:
        'Be able to fold anything in the universe, whether it be laundry or space itself. Disclaimer: May cause a rip in the space-time continuum if used improperly.',
    },
  },
]
