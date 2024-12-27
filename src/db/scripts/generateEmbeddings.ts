import { eq, getTableColumns, isNull } from 'drizzle-orm'
import { db } from '..'
import { brands as brandsTable, products as productsTable } from '../schema'
import { generateEmbeddings } from '@/lib/embedding'

const main = async () => {
  // only products with no embeddings
  const products = await db
    .select({
      ...getTableColumns(productsTable),
      brand: { name: brandsTable.name },
    })
    .from(productsTable)
    .innerJoin(brandsTable, eq(productsTable.brand_id, brandsTable.id))
    .where(isNull(productsTable.embedding))

  const embeddingInputs = products.map((product) => {
    const lines = [`Title: ${product.title}`, `Brand: ${product.brand.name}`]
    if (product.description) {
      lines.push(`Description: ${product.description}`)
    }
    if (product.specifications) {
      lines.push(`Specifications: ${product.specifications}`)
    }

    return lines.join('\n\n')
  })

  console.log(`generating embeddings for ${embeddingInputs.length} products`)
  const results = await generateEmbeddings(embeddingInputs)
  for (const result of results) {
    const product = products[result.index]
    await db
      .update(productsTable)
      .set({
        embedding: result.embedding,
      })
      .where(eq(productsTable.id, product.id))
    console.log(`OK: ${product.id} ${product.title}`)
  }

  console.log('DONE')
}

main()
