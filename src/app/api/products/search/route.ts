import { generateEmbedding } from '@/lib/embedding'
import { db } from '@/db'
import { brands, products } from '@/db/schema'
import { cosineDistance, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { buildHeaders } from '../../_shared/headers'

const LIMIT = 3

export const GET = async (req: Request): Promise<Response> => {
  const { searchParams } = new URL(req.url)
  const searchQuery = searchParams.get('q')?.toLowerCase().trim()
  if (!searchQuery) {
    // TODO: better error handling
    // TODO: minimum length of 4 characters
    throw new Error('q is a required argument')
  }

  const queryEmbedding = await generateEmbedding(searchQuery)
  const similarity = sql<number>`1 - (${cosineDistance(products.embedding, queryEmbedding)})`

  const { embedding: _embedding, ...selectedColumns } = getTableColumns(products)
  const topResults = await db
    .select({
      ...selectedColumns,
      brand: brands.name,
      similarity,
    })
    .from(products)
    .innerJoin(brands, eq(brands.id, products.brand_id))
    .orderBy((t) => desc(t.similarity))
    .limit(LIMIT)

  const responseBody = { data: topResults }
  return new Response(JSON.stringify(responseBody), {
    headers: buildHeaders({ cacheDuration: 3600 }),
    status: 200,
  })
}
