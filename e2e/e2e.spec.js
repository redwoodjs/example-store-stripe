/* eslint-env node, es2021 */
const { test } = require('@playwright/test')

test.describe('checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8910')
  })

  test('success', async ({ page }) => {
    // Click text=Folding$5.00Flight$3.50Invisibility$2.00 >> img[alt="Fold anything in the universe\, whether it be laundry or spacetime itself\. Disclaimer\: May cause a rip in the spacetime continuum if used improperly\."]
    await page
      .locator(
        'text=Folding$5.00Flight$3.50Invisibility$2.00 >> img[alt="Fold anything in the universe\\, whether it be laundry or spacetime itself\\. Disclaimer\\: May cause a rip in the spacetime continuum if used improperly\\."]'
      )
      .click()

    // Click button
    await page.locator('button').click()

    // Click text=Checkout
    await Promise.all([
      page.waitForNavigation(),
      page.locator('text=Checkout').click(),
    ])

    // Click input[name="email"]
    await page.locator('input[name="email"]').click()

    // Fill input[name="email"]
    await page.locator('input[name="email"]').fill('playwright@e2e.com')

    // Press Tab
    await page.locator('input[name="email"]').press('Tab')

    // Fill [placeholder="\31 234 1234 1234 1234"]
    await page
      .locator('[placeholder="\\31 234 1234 1234 1234"]')
      .fill('4242 4242 4242 42424')

    // Press Tab
    await page.locator('[placeholder="\\31 234 1234 1234 1234"]').press('Tab')

    // Fill [placeholder="MM \/ YY"]
    await page.locator('[placeholder="MM \\/ YY"]').fill('12 / 24')

    // Press Tab
    await page.locator('[placeholder="MM \\/ YY"]').press('Tab')

    // Fill [placeholder="CVC"]
    await page.locator('[placeholder="CVC"]').fill('424')

    // Press Tab
    await page.locator('[placeholder="CVC"]').press('Tab')

    // Fill input[name="billingName"]
    await page.locator('input[name="billingName"]').fill('playwright')

    // Press Tab
    await page.locator('input[name="billingName"]').press('Tab')

    // Press Tab
    await page.locator('select[id="billingCountry"]').press('Tab')

    // Fill [placeholder="ZIP"]
    await page.locator('[placeholder="ZIP"]').fill('91304')

    // Click [data-testid="hosted-payment-submit-button"]
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:8910/success?sessionId=cs_test_a1ns5U8OaLJgoNLkqBE6RZGJ4kHKvyLqVcHmt1YUvSnmXIMMlsAF04t4PA' }*/),
      page.locator('[data-testid="hosted-payment-submit-button"]').click(),
    ])
  })
})

// ------------------------
// Leaving this here for now in case we need to use it again.
// ------------------------
//
// const { exec } = require('child_process')
// const net = require('net')
// const path = require('path')
//
// const { test: base } = require('@playwright/test')
//
// async function isPortReachable(port, host = 'localhost') {
//   return new Promise((resolve) => {
//     const socket = net.connect(port, host, () => {
//       console.log(`Connected to ${host}:${port}`)
//       socket.end()
//       resolve(true)
//     })
//
//     socket.on('error', () => {
//       socket.destroy()
//       resolve(false)
//     })
//   })
// }
//
// async function waitTillPortIsReachable(port, host = 'localhost') {
//   return new Promise((resolve) => {
//     const interval = setInterval(async () => {
//       const portIsReachable = await isPortReachable(port, host)
//
//       if (portIsReachable) {
//         clearInterval(interval)
//         resolve()
//       }
//     }, 1_000)
//   })
// }
//
// const test = base.extend({
//   // "server" fixture starts automatically for every worker - we pass "auto" for that.
//   server: [
//     async ({}, use) => {
//       const devServerProcess = exec(
//         'yarn rw dev --fwd="--no-open" --no-generate',
//         {
//           cwd: path.resolve(__dirname, '../'),
//         }
//       )
//
//       // Pipe out logs so we can debug, when required
//       devServerProcess.stdout.on('data', (data) => {
//         process.stdout.write(data.toString())
//       })
//
//       console.log('')
//       console.log('Waiting for the dev server')
//       await Promise.all([
//         waitTillPortIsReachable(8910),
//         waitTillPortIsReachable(8911),
//       ])
//
//       console.log('Starting tests')
//       await use()
//     },
//     { scope: 'worker', auto: true },
//   ],
// })
