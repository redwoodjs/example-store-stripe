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

<p align="center">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/2712405/173251273-00b09fa6-6b3a-40ac-9e94-48c6c4d4584d.png"/>
<br/>
<b>Image 1</b>
</p>
<br/>

Note the text "Start here" with an arrow that points to the button **`Start now >`**.
Click on that button results with the invitation to either **create** a new account or **login** to existing one>

<p align="center">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/2712405/173251542-d41392da-737e-4725-86dd-edebe3f2bfce.png"/>
<br/>
<b>Image 2</b>
</p>
<br/>

Assuming that the account was already created, Stripe prompts with the second step authentication

<p align="center">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/2712405/173251771-0b04f284-1c80-4889-855e-a8e6473f35bb.png"/>
<br/>
<b>Image 3</b>
</p>
<br/>

Once providing the correct code, Stripe starts with the Home page (upper left corner).

<p align="center">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/2712405/173252864-55bde170-6646-419f-a99b-cd62d5a75606.png"/>
<br/>
<b>Image 4</b>
</p>
<br/>

Note the Developers toggle (upper right corner) - turning the toggle on results with the **`Stripe developers dashboard overview`**

<p align="center">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/2712405/173253184-b15c051f-dea7-41b0-8424-124fa359f487.png"/>
<br/>
<b>Image 4</b>
</p>
<br/>

Changing the selection from **`Overview`** to **`API keys`** provides the access to the API keys - the data needed to do anything of interest with Stripe.

<p align="center">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/2712405/173253889-146a0bf0-bd36-4518-9469-503da12ec411.png"/>
<br/>
<b>Image 5</b>
</p>

### Make sure "Test mode" is on

You can toggle "Test mode" on and off with the toggle in the upper right. Make sure it's always on. You should always see the orange "Test Data" banner.

Now that you've got your test keys, your `.env` (with proprietary information masked out), should look like:

<p align="center">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/2712405/173458298-f7cbb5dc-658d-48dc-a3eb-4dbe0d56d186.png"/>
<br/>
<b>Image 6</b>
</p>
<br/>

The Stripe webhook secret (`STRIPE_WEBHOOK_SK`) is obtained from the Stripe CLI (see
[Get started with the Stripe CLI](https://stripe.com/docs/stripe-cli) installation instructions)
and observe that the sk_test_... represents the incomplete string,

```
stripe listen --api-key=sk_test_... --print-secret
```

Note that the value of the `--api-key` flag should be the same as `STRIPE_SK`.

___
### Step 3

Seeding your Stripe account

Now  that you've got a Stripe account, you'll want to populate it with products and prices:

`yarn rw exec seed-stripe --no-prisma`

___


### Step 4

Setting up your database

#### Step 4.1 - setting the database on macOS

The Stripe Superstore uses Postgres, so if you do not have it setup locally, the following paragraphs,
inspired by this YouTube presentation [How to Install PostgreSQL and PgAdmin 4 on Mac OS](https://www.youtube.com/watch?v=u3w2Rrp9HIQ) are for you.

1: Point the browser to https://www.postgresql.org/.

2: Click on the download link.

3: Click on macOS link on the download page

4: Click on [download the installer](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) link to get EDB certified installer.

5: On the page [Download PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) pick the version 14.3 for mac OSX.

6: Follow the [installation instructions](https://www.enterprisedb.com/postgres-tutorials/installation-postgresql-mac-os).

7: run the downloaded postgresql-14.3-1-osx.dmg package which will start EDB PostgreSQL Setup Wizard. Take all default settings that are proposed by the wizard.

8: Once the Wizard finishes, you can verify the installation of all component by issuing the command `ps -ef | grep postgres`. You should see:

```zsh
nik$ ps -ef | grep postgres
  504 48772 48771   0  6:54PM ??         0:00.00 postgres: logger
  504 48774 48771   0  6:54PM ??         0:00.01 postgres: checkpointer
  504 48775 48771   0  6:54PM ??         0:00.02 postgres: background writer
  504 48776 48771   0  6:54PM ??         0:00.02 postgres: walwriter
  504 48777 48771   0  6:54PM ??         0:00.03 postgres: autovacuum launcher
  504 48778 48771   0  6:54PM ??         0:00.16 postgres: stats collector
  504 48779 48771   0  6:54PM ??         0:00.00 postgres: logical replication launcher
  501 49879  2395   0  8:26PM ttys002    0:00.00 grep postgres
```

___

#### Step 4.2 - setting the database on Windows

TBD
___

Once you've added your `DATABASE_URL` to your `.env` file, you're ready to migrate your database:

`yarn rw prisma migrate dev`
___

### Step 5

Listening for webhooks

In tandem with the dev server, you'll want to use the stripe CLI to start a process that listens for webhooks:

`stripe listen --forward-to localhost:8911/stripeWebhooks`

Make sure to pass the serverless function that's going to receive webhooks to the `--forward-to` flag.
In this app this serverless function's URL is <localhost:8911/stripeWebhooks> and the source is at `/Users/nik/dev/work/redwood/stripe/rw-integration/example-store-stripe/api/src/functions/stripeWebhooks`.

**Note:** you would need to replace the starting part of the path (`/Users/nik/dev/work/redwood/stripe/rw-integration`) with your own equivalent.

Now you should be able to start the dev server!

`yarn rw dev`

Here is the [reference to the log](https://github.com/redwoodjs/example-store-stripe/discussions/243#discussioncomment-2909682) created on the console when running this command.
___

## Roadmap

There's a lot more ways we plan to integrate RedwoodJS with Stripe.
Open an issue to let us know what features you'd like to see!

- 👉 Link to the Roadmap: <https://github.com/redwoodjs/example-store/issues/9>

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
