import { db } from '@/db'
import { brands, products } from '@/db/schema'
import { and, count, eq, getTableColumns, ilike, or } from 'drizzle-orm'

const DEFAULT_PAGE_SIZE = 6

export const GET = async (req: Request): Promise<Response> => {
  const { searchParams } = new URL(req.url)

  const { embedding: _embedding, ...selectedColumns } = getTableColumns(products)

  // TODO: refactor this to be more palatably DRY
  const selectQuery = db
    .select({
      ...selectedColumns,
      brand: brands.name,
    })
    .from(products)
    .innerJoin(brands, eq(products.brand_id, brands.id))
  const countQuery = db
    .select({
      total: count(),
    })
    .from(products)
    .innerJoin(brands, eq(products.brand_id, brands.id))

  // NOTE: $dynamic doesn't quite work
  const ands = []
  const q = searchParams.get('q')?.toLowerCase()
  if (q) {
    const likeString = `%${q}%`
    ands.push(or(ilike(products.title, likeString), ilike(products.title, likeString)))
  }
  const brandSlug = searchParams.get('brand')?.toLowerCase()
  if (brandSlug) {
    ands.push(eq(brands.slug, brandSlug))
  }

  selectQuery.where(and(...ands))
  countQuery.where(and(...ands))

  const pageSize = Number(searchParams.get('limit') ?? DEFAULT_PAGE_SIZE)
  const page = Number(searchParams.get('page') ?? 1)
  const offset = page - 1
  const queryResult = await selectQuery.limit(pageSize).offset(offset * pageSize)
  const [{ total }] = await countQuery
  const maxPages = Math.ceil(total / pageSize)

  const responseBody = { data: queryResult, total, maxPages }
  return new Response(JSON.stringify(responseBody), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  })
}
