import { DATABASE_POOLING_URL } from '@/lib/env'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

config()
const client = postgres(DATABASE_POOLING_URL!)
export const db = drizzle({ client })
