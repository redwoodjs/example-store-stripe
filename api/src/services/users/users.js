import {
  stripeCustomerSearch,
  createStripeCustomer,
} from '@redwoodjs-stripe/api'

import { db } from 'src/lib/db'

// Checks whether newly created user is a stripe Customer and adds their Stripe Customer Id to User
export const addStripeId = async ({ id: userId }) => {
  let stripeId = ''
  const { email } = await getCustomerEmail({ id: userId })

  // get customerID from Stripe using email
  const customer = await stripeCustomerSearch({
    query: `email: \"${email}\"`,
  })

  if (customer == undefined) {
    const newCustomer = await createStripeCustomer({ data: { email: email } })
    stripeId = newCustomer.id
  } else {
    stripeId = customer.id
  }

  return await updateStripeId({
    id: userId,
    stripeId: stripeId,
  })
}

export const getCustomerEmail = async ({ id }) => {
  return await db.user.findUnique({
    where: { id },
    select: {
      email: true,
    },
  })
}

export const updateStripeId = async ({ id, stripeId }) => {
  return db.user.update({
    data: { stripeId },
    where: { id },
  })
}

// Only to be used on the api side
export const getCustomerId = async ({ id }) => {
  return await db.user.findUnique({
    where: { id: id },
  })
}

export const getUserByCustomerId = ({ id }) => {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  })
}

export const updateUserByCustomerId = ({ id, payload }) => {
  return db.user.update({
    where: {
      id,
    },
    data: payload,
  })
}

// update db if name and email has changed
export const handleDBSync = async (id, nextName, nextEmail) => {
  const customer = await getUserByCustomerId({ id })

  if (!customer) {
    console.error('It seems this customer is not in your database.')
    return
  }

  if (
    !!customer.email &&
    nextEmail === customer.email &&
    !!customer.name &&
    nextName === customer.name
  ) {
    return
  }

  const payload = {}

  if (nextEmail !== customer.email) {
    payload.email = nextEmail
  }

  if (nextName !== customer.name) {
    payload.name = nextName
  }

  return await updateUserByCustomerId({ id, payload })
}
