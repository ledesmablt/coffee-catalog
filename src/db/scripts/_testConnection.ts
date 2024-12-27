import { count } from 'drizzle-orm'
import { db } from '..'
import { shops } from '../schema'

const main = async () => {
  const [{ num_shops }] = await db.select({ num_shops: count() }).from(shops)
  console.log(`Connection OK: ${num_shops} rows in 'shops' table`)
}

main()
