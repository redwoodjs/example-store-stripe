# Contributing

Contributions are welcome!

## Testing your Contribution

There's a few ways you can go about testing your contribution.

### Playwright E2E Tests

We have a few [Playwright](https://playwright.dev/) e2e tests in the [e2e directory](./e2e/e2e.spec.js).
Right now they test checking out with a product that requires a one time payment and checking out with a product that requires a recurring payment.

While we run these tests in CI, you can (and, if your code changes checkout, probably should) run them locally too:

```
yarn dlx playwright test e2e
```

If you want to actually see the tests run in the browser, add the `--headed` flag:

```
yarn dlx playwright test e2e --headed
```

https://user-images.githubusercontent.com/32992335/165687174-3bf7a66b-086d-46ec-8683-e432ba4bbdd5.mov

### Netlify Deploy Preview

When you open a pull request, Netlify deploys your branch! Check the deploy preview and make sure everything looks ok:

![image](https://user-images.githubusercontent.com/32992335/157901408-eef552f8-c6f8-49aa-b460-5075b622e983.png)

### `api` Tests

If your contribution affects the api side, we have a few tests you can run to make sure everything still works:

```
yarn rw test api
```

You may need to configure a `TEST_DATABASE_URL`.
You get your `TEST_DATABASE_URL` the same way you got your `DATABASE_URL`—see the [`README.md`](README.md) for more.

### Manually checking out

While it gets old fast, you can of course test things manually by going through the checkout yourself.
Just make sure  to use one of stripe's [test cards](https://stripe.com/docs/testing) when filling out your payment information.

## Style Guide

There's a few conventions that we follow.

### Use feature branches

We use feature branches that start with one of three slash prefixes:

- `feat/`—a brand new feature
- `bug/`—a bug fix
- `enhance/`—an improvement to an already-existing feature

Here's some examples of goodly-named branches:

- `feat/add-CONTRIBUTING.md`
- `bug/fix-webhooks`
- `enhance/update-stripe-element-styling`
