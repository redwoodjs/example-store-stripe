// Define your own mock data here:
export const standard = () => ({
  products: [
    {
      id: 1,
      name: 'Folding',
      description:
        'Fold anything in the universe, whether it be laundry or spacetime itself. Disclaimer: May cause a rip in the spacetime continuum if used improperly.',
      price: 500,
      image: '/img/folding.png',
      type: 'product',
    },
    {
      id: 3,
      name: 'Flight',
      description:
        'Fly up to 50m into the sky and reach a maximum speed of 180km/h.',
      price: 350,
      image: '/img/flight.png',
      type: 'product',
    },
    {
      id: 2,
      name: 'Invisibility',
      description:
        'Become invisible in the blink of an eye and avoid all those pesky people. Warning: overuse may cause one to feel transparent and lost.',
      price: 200,
      image: '/img/invisibility.png',
      type: 'product',
    },
  ],
})
