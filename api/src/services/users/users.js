import {
  stripeCustomerSearch,
  createStripeCustomer,
} from '@redwoodjs-stripe/api'

import { db } from 'src/lib/db'

export const addStripeId = async ({ id }) => {
  let stripeId = ''
  const { email } = getCustomerEmail({ id })

  // get customerID from Stripe using email
  const {id} = await stripeCustomerSearch({
    query: `email: \"${user.email}\"`,
  })

  if (customer == undefined) {
    const newCustomer = await createStripeCustomer({ email })
    stripeId = newCustomer.id
  } else {
    stripeId = customer.id
  }

  return await updateStripeId({
    id,
    stripeId: stripeId,
  })
}

export const getCustomerEmail = ({ id }) => {
  return db.user.findUnique({
    where: { id },
    select: { email },
  })
}

export const updateStripeId = ({ id, stripeId }) => {
  return db.user.update({
    where: {
      id,
    },
    data: {
      stripeId,
    },
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
