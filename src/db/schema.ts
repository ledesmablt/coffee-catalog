import { integer, pgSchema, varchar, text, timestamp, vector, index } from 'drizzle-orm/pg-core'

const SCHEMA_NAME = 'coffee_catalog'

const schema = pgSchema(SCHEMA_NAME)

export const brands = schema.table('brands', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp()
    .notNull()
    .$onUpdate(() => new Date()),
  name: varchar().notNull(),
  slug: varchar().notNull().unique(),
  shop_url: varchar(),
  description: text(),
  instagram_username: varchar(),
  logo_url: text(),
  logo_background_color: varchar(),
  google_maps_query: text(),
})

export type Brand = typeof brands.$inferSelect

export const products = schema.table(
  'products',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp()
      .notNull()
      .$onUpdate(() => new Date()),
    title: varchar().notNull(),
    brand_id: integer()
      .references(() => brands.id, { onDelete: 'cascade' })
      .notNull(),
    sku: varchar(),
    description: text(),
    specifications: text(),
    image_url: text(),
    ecommerce_url: text(),
    // for # of dimensions, see OPENAI_EMBEDDING_SETTINGS
    embedding: vector('embedding', { dimensions: 512 }),
  },
  (table) => ({
    embeddingIndex: index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops')),
  }),
)

export type Product = typeof products.$inferSelect
