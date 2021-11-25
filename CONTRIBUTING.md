# Contributing

Anyone is welcome to contribute!

## Getting Started

1. Clone this repo, `cd` into it, and `yarn install`

```
git clone git@github.com:redwoodjs/example-store.git
cd example-store
yarn
```

2. Get your Stripe test keys

You'll need a Stripe account to get your test keys.
If you don't already have one, you can make one here: https://dashboard.stripe.com/login?redirect=%2Ftest%2Fdashboard.

Once you've made your account, if you weren't automatically redirected, navigate to your [test dashboard](https://dashboard.stripe.com/test/dashboard). You can get your test keys there:

![image](https://user-images.githubusercontent.com/32992335/143495019-3c6319d3-f793-48c9-86ca-72f4c12f0306.png)

> **Make sure "Test mode" is on**
>
> You can toggle "Test mode" on and off with the toggle in the upper right.
> Make sure it's always on. You should always see the orange "Test Data" banner.

Your `.env` should look like:

```
STRIPE_PK=pk_test_...
STRIPE_SK=sk_test_...
# This one isn't strictly necessary.
STRIPE_WEBHOOK_SK=whsec_...
```

You only need the webhook secret if you're using webhooks.
You can get it from the [Stripe CLI](https://stripe.com/docs/stripe-cli).

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
