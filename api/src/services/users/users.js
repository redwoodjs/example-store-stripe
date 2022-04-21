import { db } from 'src/lib/db'

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
  const { name, email } = await getUserByCustomerId({ id })

  if (nextEmail === email && nextName === name) {
    return
  }

  const payload = {}

  if (nextEmail !== email) {
    payload.email = nextEmail
  }

  if (nextName !== name) {
    payload.name = nextName
  }

  return await updateUserByCustomerId({ id, payload })
}
