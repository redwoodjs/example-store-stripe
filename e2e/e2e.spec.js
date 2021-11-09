/* eslint-env node */
const { test, expect } = require('@playwright/test')

test.describe('checkout', () => {
  test.beforeEach(async ({ page }) => {
    /**
     * Go to the starting URL before each test.
     */
    await page.goto('http://localhost:8910/stripe-cart')

    // Click text=Checkout
    // eslint-disable-next-line no-undef
    await Promise.all([
      /**
       * The URL's gonna be different every time we run the test.
       */
      page.waitForNavigation({ url: /https:\/\/checkout.stripe.com\/pay/ }),
      page.click('button:has-text("Checkout")'),
    ])
  })

  test('success', async ({ page }) => {
    // Click input[name="email"]
    await page.click('input[name="email"]')

    // Fill input[name="email"]
    await page.fill('input[name="email"]', 'cone@redwoodjs.com')

    // Press Tab
    await page.press('input[name="email"]', 'Tab')

    // Fill [placeholder="1234 1234 1234 1234"]
    await page.fill(
      '[placeholder="1234 1234 1234 1234"]',
      '4242 4242 4242 42422'
    )

    // Press Tab
    await page.press('[placeholder="1234 1234 1234 1234"]', 'Tab')

    // Fill [placeholder="MM / YY"]
    await page.fill('[placeholder="MM / YY"]', '04 / 24')

    // Press Tab
    await page.press('[placeholder="MM / YY"]', 'Tab')

    // Fill [placeholder="CVC"]
    await page.fill('[placeholder="CVC"]', '4242')

    // Press Tab
    await page.press('[placeholder="CVC"]', 'Tab')

    // Fill input[name="billingName"]
    await page.fill('input[name="billingName"]', 'Redwood Cone')

    // Press Tab
    await page.press('input[name="billingName"]', 'Tab')

    // Press Tab
    await page.press('[aria-label="Country or region"]', 'Tab')

    // Fill [placeholder="ZIP"]
    await page.fill('[placeholder="ZIP"]', '424242')

    // Click [data-testid="hosted-payment-submit-button"]
    // eslint-disable-next-line no-undef
    await Promise.all([
      page.waitForNavigation({
        url: /http:\/\/localhost:8910\/stripe-cart\?success=true&sessionId=/,
      }),
      page.click('[data-testid="hosted-payment-submit-button"]'),
    ])

    expect(await page.screenshot()).toMatchSnapshot('success.png')
  })

  test('canceled', async ({ page }) => {
    // Click text=Back
    // eslint-disable-next-line no-undef
    await Promise.all([
      page.waitForNavigation({
        url: 'http://localhost:8910/stripe-cart?success=false',
      }),
      page.click('text=Back'),
    ])

    expect(await page.screenshot()).toMatchSnapshot('canceled.png')
  })
})
