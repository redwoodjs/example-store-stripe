import CartProvider from 'src/components/CartProvider'
import MainLayout from 'src/layouts/MainLayout'

import HomePage from './HomePage'

export const generated = () => {
  return <HomePage />
}

export default {
  title: 'Pages/HomePage',
  decorators: [
    (Story) => (
      <CartProvider>
        <MainLayout>
          <Story />
        </MainLayout>
      </CartProvider>
    ),
  ],
}
