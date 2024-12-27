import { integer, pgSchema, varchar, text, timestamp } from 'drizzle-orm/pg-core'

const SCHEMA_NAME = 'coffee_catalog'

const schema = pgSchema(SCHEMA_NAME)

export const shops = schema.table('shops', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp()
    .notNull()
    .$onUpdate(() => new Date()),
  name: varchar().notNull(),
  slug: varchar().notNull(),
  shop_url: varchar(),
  description: text(),
  instagram_username: varchar(),
  logo_url: text(),
  logo_background_color: varchar(),
  google_maps_query: text(),
})

export const products = schema.table('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp()
    .notNull()
    .$onUpdate(() => new Date()),
  title: varchar().notNull(),
  shop_id: integer()
    .references(() => shops.id, { onDelete: 'cascade' })
    .notNull(),
  sku: varchar(),
  description: text(),
  specifications: text(),
  image_url: text(),
  ecommerce_url: text(),
})
