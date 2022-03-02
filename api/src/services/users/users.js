import { db } from 'src/lib/db'

// Only to be used on the api side
export const getCustomerId = async ({ id }) => {
  return await db.user.findUnique({
    where: { id: parseInt(id) },
  })
}

export const getUserByCustomerId = async (customerId) => {
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

// update db if name and email has changed
export const handleDBSync = async (customerId, nextName, nextEmail) => {
  console.log(nextName, nextEmail)
  const user = getUserByCustomerId(customerId)
  console.log(user)
}
