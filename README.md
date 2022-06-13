# Stripe Superstore

Welcome to the Stripe Superstore!
This repo is an example of a RedwoodJS-Stripe integration.
Since most startups need to accept payments, we designed this repo to demonstrate how you could go about integrating Stripe into your RedwoodJS project.

In this repo, you'll see how to:

- use [Stripe Checkout](https://stripe.com/docs/payments/checkout) to accept [one-time payments](https://stripe.com/docs/payments/accept-a-payment?integration=checkout) and [subscriptions](https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=checkout)
- receive notifications by processing webhooks using a serverless function
- robustly manage app-level state via a persistent cart
- and more!

Keep reading to get started or check out the [Roadmap](#roadmap) to see the features we've got planned.

## Getting Started

### Step 1

Clone this repo, `cd` into it, and `yarn install`

```zsh
git clone git@github.com:redwoodjs/example-store-stripe.git
cd example-store-stripe
yarn install
```

### Step 2

Get your Stripe test keys

To develop on this repo locally, you'll need to populate your `.env` file with a few env vars. The first of those is your Stripe test keys.

First time visitor gets greeted like:

<img width="857" alt="image" src="https://user-images.githubusercontent.com/2712405/173251273-00b09fa6-6b3a-40ac-9e94-48c6c4d4584d.png">

Note the text "Start here" with an arrow that points to the button **`Start now >`**. Click on that button results with the invitation to either create a new account or login to existing one>

<img width="1003" alt="image" src="https://user-images.githubusercontent.com/2712405/173251542-d41392da-737e-4725-86dd-edebe3f2bfce.png">

Assuming that the account was already created, Stripe prompts with the second step authentication

<p align="center">
<img width="540" alt="image" src="https://user-images.githubusercontent.com/2712405/173251771-0b04f284-1c80-4889-855e-a8e6473f35bb.png"/>
<br/>
<b></b>
</p>
<br/>

Providing the correct code, Stripe starts at the Home page (upper left corner).

<img width="1060" alt="image" src="https://user-images.githubusercontent.com/2712405/173252864-55bde170-6646-419f-a99b-cd62d5a75606.png">

Note the Developers toggle (upper right corner) - turning the toggle on results with the **`Stripe developers dashboard overview`**

<img width="972" alt="image" src="https://user-images.githubusercontent.com/2712405/173253184-b15c051f-dea7-41b0-8424-124fa359f487.png">

Changing the selection from **`Overview`** to **`API keys`** provides the access to the API keys - the data needed to do anything of interest with Strapi.

<img width="995" alt="image" src="https://user-images.githubusercontent.com/2712405/173253889-146a0bf0-bd36-4518-9469-503da12ec411.png">

### Make sure "Test mode" is on

You can toggle "Test mode" on and off with the toggle in the upper right.
Make sure it's always on. You should always see the orange "Test Data" banner.

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

### Step 3

Seeding your Stripe account

Now  that you've got a Stripe account, you'll want to populate it with products and prices:

```
yarn rw exec seed-stripe --no-prisma
```

### Step 4

Setting up your database

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

5. Listening for webhooks

In tandem with the dev server, you'll want to use the stripe CLI to start a process that listens for webhooks:

```
stripe listen --forward-to 'localhost:8911/stripeWebhooks'
```

Make sure to pass the serverless function that's going to receive webhooks to the `--forward-to` flag.

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
