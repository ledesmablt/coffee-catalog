import { SQL, sql } from 'drizzle-orm'
import { integer, pgSchema, varchar, text, timestamp, vector, index, customType } from 'drizzle-orm/pg-core'

const SCHEMA_NAME = 'coffee_catalog'

export const schema = pgSchema(SCHEMA_NAME)

const tsVector = customType<{ data: string }>({
  dataType() {
    return 'tsvector'
  },
})

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
    text_search: tsVector('text_search').generatedAlwaysAs((): SQL => {
      return sql`to_tsvector('english', ${products.title} || ' ' || COALESCE(${products.description}, '') || ' ' || COALESCE(${products.specifications}, ''))`
    }),
  },
  (table) => ({
    // TODO rename to snake-case
    embeddingIndex: index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops')),
    text_search_index: index('text_search_index').using('gin', table.text_search),
  }),
)

export type Product = typeof products.$inferSelect
