# Stripe Superstore

Welcome to the Stripe Superstore!
This repo is an example of a RedwoodJS-Stripe integration.
Since most startups need to accept payments,
we designed this repo to demonstrate how you could go about integrating Stripe into your RedwoodJS project.
In this repo, you'll see how to:
- use [Stripe Checkout](https://stripe.com/docs/payments/checkout) to accept [one-time payments](https://stripe.com/docs/payments/accept-a-payment?integration=checkout) and [subscriptions](https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=checkout)
- receive notifications by processing webhooks using a serverless function
- robustly manage app-level state via a persistent cart
- and more!

Keep reading to get started or check out the [Roadmap](#roadmap) to see the features we've got planned.

## Getting Started

1. Clone this repo, `cd` into it, and `yarn install`

```
git clone git@github.com:redwoodjs/example-store-stripe.git
cd example-store
yarn install
```

2. Get your Stripe test keys

To develop on this repo locally, you'll need to populate your `.env` file with a few env vars. The first of those is your Stripe test keys.

You'll need a Stripe account to get your test keys.
If you don't already have one, you can make one here: https://dashboard.stripe.com/login?redirect=%2Ftest%2Fdashboard.

Once you've made your account, if you weren't automatically redirected, navigate to your [test dashboard](https://dashboard.stripe.com/test/dashboard). You'll find your test keys on the right side of the page:

![image](https://user-images.githubusercontent.com/30793/180631063-97aa9cca-6343-4c8d-a0ae-28c1bb9e5e70.png)

> If you've activated your account, you can toggle "Test mode" on and off with the toggle in the upper right.
> Make sure it's always on.

Now that you've got your test keys, your `.env` should look like:

```
STRIPE_PK=pk_test_...
STRIPE_SK=sk_test_...
```

You'll need one more Stripe env var: the Stripe webhook secret (`STRIPE_WEBHOOK_SK`).
You can get it from the [Stripe CLI](https://stripe.com/docs/stripe-cli) (see the link for installation instructions):

```
stripe listen --api-key=sk_test_... --print-secret
```

Note that the value of the `--api-key` flag should be the same as `STRIPE_SK`.

Now your `.env` file should look like this:

```
STRIPE_PK=pk_test_...
STRIPE_SK=sk_test_...
STRIPE_WEBHOOK_SK=whsec_...
```

3. Seeding your Stripe account

Now that you've got a Stripe account, you'll want to populate it with products and prices:

```
yarn rw exec seed-stripe --no-prisma
```

4. Authentication

We've started working on adding user login. For that we're using Redwood's
[dbAuth](https://redwoodjs.com/docs/auth/dbauth). So far we've only added
login, logout, and reset password pages. There's no extra functionality for
authenticated users.

For dbAuth to work properly, you need to generate a secret key and save it as an
environment variable:

```
echo "SESSION_SECRET=$(yarn rw g secret --raw)" >> .env
```

5. Setting up your database

You'll need one more env var.
The Stripe Superstore uses Postgres, so before you can migrate your database, you'll need to set your `DATABASE_URL` env var.

If you don't already have Postgres setup locally, it can be a little tricky to do so.
If you're on a Mac, [Postgres.app](https://postgresapp.com/) is a tried-and-true solution.
We don't have recommendations for other platforms, but one thing we do recommend is using [railway.app](https://railway.app/)—even for local development—since it trivializes this whole process.

Once you've added your `DATABASE_URL` to your `.env` file, you're ready to migrate your database:

```
yarn rw prisma migrate dev
```

Now you should be able to start the dev server!

```
yarn rw dev
```

6. Listening for webhooks

In tandem with the dev server, you'll want to use the stripe CLI to start a process that listens for webhooks:

```
stripe listen --forward-to 'localhost:8911/stripeWebhooks'
```

Make sure to pass the serverless function that's going to receive webhooks to the `--forward-to` flag.

7. Testing

This project comes with a full test suite. To be able to run it
(`yarn rw test`) you need to configure a test database. To do that,
create another database, just like you did in step 5. Then add a
new variable to your `.env` file called `TEST_DATABASE_URL`.
You should end up having something like this in your `.env` file:

```
DATABASE_URL=postgres://postgres:password@localhost:5432/db-name
TEST_DATABASE_URL=postgres://postgres:password@localhost:5432/db-name-test
```

## Roadmap

There's a lot more ways we plan to integrate RedwoodJS with Stripe.
Open an issue to let us know what features you'd like to see!

- 👉 Link to the Roadmap: https://github.com/redwoodjs/example-store/issues/9

## Leadership

- Christine van der Merwe (Chris; [@chrisvdm](https://github.com/chrisvdm))
- Dominic Saadi (Dom; [@jtoar](https://github.com/jtoar))

Chris is the project lead and Dom is point from the RedwoodJS Core Team.

## History

This repo is the second iteration of the RedwoodJS-Stripe project.
The first can be found in the [redwoodjs-stripe](https://github.com/chrisvdm/redwoodjs-stripe) repo.

The first was focused on integrating Stripe with RedwoodJS from the ground up.
This presented many technical challenges, namely, how can we make RedwoodJS a more-pluggable framework.

This project takes the opposite approach by focusing on what a Stripe integration in a RedwoodJS Project would look like.
