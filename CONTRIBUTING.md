# Contributing

Contributions are welcome!

## Testing your Contribution

There's a few ways you can go about testing your contribution.

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

<!-- ### Running the E2E Test

We have a small e2e test you can use to test your contribution.
You'll have to have [playwright](https://playwright.dev/) installed:

```
npx playwright install
```

First, start the dev server in the background:

```
yarn rw dev &
```

Then, run the e2e test:

```
yarn rw-test-e2e
```

If you want to watch the tests as they happen, pass the `--headed` flag:

```
yarn rw-test-e2e --headed
``` -->

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
