import { applyStringFilter } from '../_shared/filters'
import { loadAllProducts } from '../_shared/loadAllProducts'

const LIMIT = 5

export const GET = async (req: Request): Promise<Response> => {
  const { searchParams } = new URL(req.url)

  // NOTE: very crude, let's do it better with a db next time
  let products = await loadAllProducts()
  // filter by brand
  // filter by matching keywords
  const brand = searchParams.get('brand')?.toLowerCase()
  if (brand) {
    products = products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
  }

  const q = searchParams.get('q')?.toLowerCase()
  if (q) {
    products = await applyStringFilter(q, products)
  }

  const maxPages = Math.ceil(products.length / LIMIT)
  const page = Number(searchParams.get('page') ?? 1)
  const offset = page - 1
  products = products.slice(offset * LIMIT, (offset + 1) * LIMIT)

  const responseBody = { data: products, maxPages }
  return new Response(JSON.stringify(responseBody), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  })
}
