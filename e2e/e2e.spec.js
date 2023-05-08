/* eslint-env node, es2021 */
const { test } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8910')
})

const user = {
  email: 'playwright@e2e.com',
  name: 'Playwright',
}

test.describe('checkout', () => {
  test('one_time', async ({ page }) => {
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

    await doCheckout(page, user)

    // Success page has billingName
    await page.locator('p', { hasText: user.name })
  })

  test('recurring', async ({ page }) => {
    // Click text=Folding$35.00Flight$17.00Invisibility$10.00 >> img[alt="Fold anything in the universe\, whether it be laundry or spacetime itself\. Disclaimer\: May cause a rip in the spacetime continuum if used improperly\."]
    await page
      .locator(
        'text=Folding$35.00Flight$17.00Invisibility$10.00 >> img[alt="Fold anything in the universe\\, whether it be laundry or spacetime itself\\. Disclaimer\\: May cause a rip in the spacetime continuum if used improperly\\."]'
      )
      .click()

    // Click button
    await page.locator('button').click()

    // Click text=Checkout
    await Promise.all([
      page.waitForNavigation(),
      page.locator('text=Checkout').click(),
    ])

    await doCheckout(page, user)

    // Success page has billingName
    await page.locator('p', { hasText: user.name })

    // Click text=Sign up
    await page.locator('text=Sign up').click()

    // Fill input[name="username"]
    await page.locator('input[name="username"]').fill(user.email)

    // Fill input[name="password"]
    await page.locator('input[name="password"]').fill('1234')

    // Click text=Sign Up
    await Promise.all([
      page.waitForNavigation(),
      page.locator('text=Sign Up').click(),
    ])

    // Click text=Sign Up
    await Promise.all([
      page.waitForNavigation(),
      page.locator('button >> nth=1').click(),
    ])

    await page.locator(`text=${user.email}`)
  })
})

async function doCheckout(page, { email, name }) {
  // Fill input[name="email"]
  await page.locator('input[name="email"]').fill(email)

  // Fill [placeholder="\31 234 1234 1234 1234"]
  await page
    .locator('[placeholder="\\31 234 1234 1234 1234"]')
    .fill('4242 4242 4242 42424')

  // Fill [placeholder="MM \/ YY"]
  await page.locator('[placeholder="MM \\/ YY"]').fill('12 / 24')

  // Fill [placeholder="CVC"]
  await page.locator('[placeholder="CVC"]').fill('424')

  // Fill input[name="billingName"]
  await page.locator('input[name="billingName"]').fill(name)

  // Select US
  await page.locator('[aria-label="Country or region"]').selectOption('US')

  // Fill [placeholder="ZIP"]
  await page.locator('[placeholder="ZIP"]').fill('12345')

  // Click [data-testid="hosted-payment-submit-button"]
  await Promise.all([
    page.waitForNavigation(),
    page.locator('[data-testid="hosted-payment-submit-button"]').click(),
  ])
}

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
