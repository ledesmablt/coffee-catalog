import type { Product } from '@/_types/schema'

export type SearchFilterFn = (searchQuery: string, products: Product[]) => Promise<Product[]>

// TODO: handle this in the simple product search with drizzle orm,
// then delete it all after
export const applyStringFilter: SearchFilterFn = async (searchQuery, products) => {
  return products.filter((product) => {
    const filterableString = [product.title, product.brand, product.description, product.specifications]
      .join(' ')
      .toLowerCase()
    return filterableString.includes(searchQuery)
  })
}
