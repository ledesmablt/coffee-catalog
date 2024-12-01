import nodePath from 'path'
import { promises as fs } from 'fs'
import { Product } from '../../_types/schema'

export const loadProducts = async (): Promise<Product[]> => {
  const rootPath = process.cwd()
  const dataPath = nodePath.join(rootPath, 'data', 'merged_data_with_embeddings.json')
  const fileContent = await fs.readFile(dataPath, 'utf8')
  return JSON.parse(fileContent)
}
