import { db } from 'src/lib/db'

// Only to be used on the api side
export const getCustomerId = async ({ id }) => {
  return await db.user.findUnique({
    where: { id: parseInt(id) },
  })
}

export const getUserByCustomerId = async ({ customerId }) => {
  return await db.user.findUnique({
    where: {
      customerId: customerId,
    },
    select: {
      name: true,
      email: true,
    },
  })
}

export const updateUserByCustomerId = async ({ customerId, payload }) => {
  return await db.user.update({
    where: {
      customerId: customerId,
    },
    data: payload,
  })
}

// update db if name and email has changed
export const handleDBSync = async (customerId, nextName, nextEmail) => {
  const { name, email } = await getUserByCustomerId({
    customerId: customerId,
  })
  if (nextEmail !== email || nextName !== name) {
    const payload = {}
    if (nextEmail !== email) {
      payload.email = nextEmail
    }
    if (nextName !== name) {
      payload.name = nextName
    }
    return await updateUserByCustomerId({
      customerId: customerId,
      payload: payload,
    })
  }
  return
}
