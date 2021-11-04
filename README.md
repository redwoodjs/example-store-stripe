# Redwood-Stripe Example Store

Welcome to the RedwoodJS Example Store!
This repo is an example of a Redwood-Stripe integration.

This repo is the second iteration of the Redwood-Stripe project.
The first can be found in the [redwoodjs-stripe](https://github.com/chrisvdm/redwoodjs-stripe) repo.

The first was focused on integrating Redwood with Stripe from the ground up.
This presented many technical challenges, namely, how can we make Redwood as a Framework more pluggable.

This project takes the opposite approach by focusing on what a Stripe integration in a Redwood Project would look like.

The thinking is that, in the third iteration, having approached the problem from both low and high-level perspectives, we can converge on a solution.

  - [Roadmap](#roadmap)
  - [Leadership](#leadership)
  - [Contributing](#contributing)
    - [Use feature branches](#use-feature-branches)

## Roadmap

Here's a very general roadmap:

- [ ] Write the README
- [ ] Use work from previous iteration of the project to inform this iteration (this should get us most of the way to a working integration with [Checkout](https://stripe.com/payments/checkout))
- Do these things before sharing the project with the community:
  - [ ] Add tests / CI
  - [ ] Add docs
  - [ ] Have an official roadmap
  - [ ] Make it fun / original
- [ ] Post on the forum (something along the lines of "How to Integrate Redwood with Stripe")

After that, here's some of the other things we're thinking about doing:

- Use [Stripe Elements](https://stripe.com/payments/elements)
- Livestream / screencasts

## Leadership

- Christine van der Merwe (Chris; [@chrisvdm](https://github.com/chrisvdm))
- Dominic Saadi (Dom; [@jtoar](https://github.com/jtoar))

Chris is the project lead and Dom is point from the RedwoodJS Core Team.
Chris and Dom meet biweekly to discuss the status of the project.

## Contributing

Anyone is welcome to contribute! Here's some of our conventions:

### Use feature branches

We use feature branches that start with one of three slash prefixes:

- `feat/`—a brand new feature
- `bug/`—a bug fix
- `enhance/`—an improvement to an already-existing feature

Here's some examples of goodly-named branches:

- `feat/add-CONTRIBUTING.md`
- `bug/fix-webhooks`
- `enhance/update-stripe-element-styling`
