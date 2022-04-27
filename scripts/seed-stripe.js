/**
 * Types
 *
 * @typedef {{
 *  currency: string,
 *  unit_amount: number,
 *  recurring?: {
 *    interval: 'month',
 *  }
 * }} Price
 *
 * @typedef {{
 *  name: string
 *  description: string
 *  prices: Price[]
 * }} Superpower
 */
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

import { stripe } from 'api/src/lib/stripe'
import { prompt } from 'enquirer'

export default async () => {
  console.log('Getting products')
  const { data: products } = await stripe.products.list({
    active: true,
  })

  const hasProducts = Boolean(products.length)

  if (hasProducts) {
    console.log('Found products')

    const { shouldArchiveProducts } = await prompt({
      name: 'shouldArchiveProducts',
      type: 'confirm',
      message:
        'It looks like you already have products and prices. Do you want to archive and re-seed them?',
    })

    if (!shouldArchiveProducts) {
      console.log('Exiting')
      process.exit(1)
    }

    console.log('Archiving products')
    for (const product of products) {
      await stripe.products.update(product.id, { active: false })
    }
  }

  console.log('Seeding products')

  /** @type {Superpower[]} */
  const superpowers = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'superpowers.json'), 'utf-8')
  )

  for (const superpower of superpowers) {
    const { prices, ...productData } = superpower

    console.log(`Creating ${productData.name}`)
    const product = await stripe.products.create(productData)

    for (const price of prices) {
      await stripe.prices.create({
        product: product.id,
        ...price,
      })
    }
  }

  console.log('Done')
  console.log(
    'Remember to add the images in the web/public/img directory to the products in the Stripe dashboard'
  )

  const { shouldOpenDashboard } = await prompt({
    name: 'shouldOpenDashboard',
    type: 'confirm',
    message: 'Do you want to open the Stripe dashboard now?',
  })

  if (shouldOpenDashboard) {
    console.log('Opening dashboard')
    execSync('open https://dashboard.stripe.com/test/products?active=true')
  }
}
