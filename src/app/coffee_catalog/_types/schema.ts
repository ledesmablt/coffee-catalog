export interface Product {
  id: number
  title: string
  brand: string
  shopify_url: string
  embedding: number[]
  sku?: number
  description?: string
  specifications?: string
  image_url?: string
  similarity?: number
}

export interface Brand {
  name: string
  website_url: string
  instagram_username: string
  logo_url: string
  google_maps_plus_code?: string
  state: string
  slug: string
}
