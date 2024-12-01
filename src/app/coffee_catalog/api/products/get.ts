import { loadBrands } from '../../_shared/loaders/brands'
import { loadProducts } from '../../_shared/loaders/products'
import { applyStringFilter } from '../_shared/filters'

const LIMIT = 5

export const GET = async (req: Request): Promise<Response> => {
  const { searchParams } = new URL(req.url)

  // NOTE: very crude, let's do it better with a db next time
  let products = await loadProducts()
  const brands = await loadBrands()
  // filter by brand
  // filter by matching keywords
  const brandSlug = searchParams.get('brand')?.toLowerCase()
  if (brandSlug) {
    const brand = brands.find((b) => b.slug === brandSlug)
    if (brand) {
      products = products.filter((p) => p.brand === brand.name)
    } else {
      products = []
    }
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
