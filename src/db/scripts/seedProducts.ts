import nodePath from 'path'
import { promises as fs } from 'fs'

import { db } from '..'
import { brands as brandsTable, products as productsTable } from '../schema'

const main = async () => {
  const rootPath = process.cwd()
  const dataPath = nodePath.join(rootPath, 'data', 'merged_data.json')
  const fileContent = await fs.readFile(dataPath, 'utf8')

  const brands = await db.select().from(brandsTable)
  const values = JSON.parse(fileContent)
    .map((product: Record<string, string | null>) => {
      type InsertableProduct = typeof productsTable.$inferInsert
      const brand = brands.find((b) => b.name === product.brand)
      if (!brand || !product.title) {
        return
      }

      return {
        title: product.title,
        brand_id: brand.id,
        sku: product.sku,
        description: product.description,
        specifications: product.specifications,
        image_url: product.image_url,
        ecommerce_url: product.shopify_url,
      } satisfies InsertableProduct
    })
    .filter(Boolean)

  const result = await db.insert(productsTable).values(values).returning({ insertedId: productsTable.id })
  console.log(`inserted ${result.length} rows into 'products'`)
}

main()
