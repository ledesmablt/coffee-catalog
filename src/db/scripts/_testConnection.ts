import { count } from 'drizzle-orm'
import { db } from '..'
import { brands } from '../schema'

const main = async () => {
  const [{ num_brands }] = await db.select({ num_brands: count() }).from(brands)
  console.log(`Connection OK: ${num_brands} rows in 'brands' table`)
}

main()
