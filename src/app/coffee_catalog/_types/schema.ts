export interface Product {
  name: string
  description: string
  specifications: string
  image_url: string
  shopify_url: string
  embedding: number[]
  similarity?: number
}
