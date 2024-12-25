import { Product } from '../../_types/schema'

export type SearchFilterFn = (searchQuery: string, products: Product[]) => Promise<Product[]>

export const applyStringFilter: SearchFilterFn = async (searchQuery, products) => {
  return products.filter((product) => {
    const filterableString = [product.title, product.brand, product.description, product.specifications]
      .join(' ')
      .toLowerCase()
    return filterableString.includes(searchQuery)
  })
}
