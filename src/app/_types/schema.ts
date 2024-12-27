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
