import { db } from 'src/lib/db'

// Only to be used on the api side
export const getCustomerId = async ({ id }) => {
  return await db.user.findUnique({
    where: { id: parseInt(id) },
  })
}
