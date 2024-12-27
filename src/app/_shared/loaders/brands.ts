import { db } from '@/db'
import { brands } from '@/db/schema'

export const loadBrands = async () => {
  const results = await db.select().from(brands)
  return results
}
