import nodePath from 'path'
import { promises as fs } from 'fs'
import type { Product } from '../../_types/schema'
import OpenAI from 'openai'

const openAIClient = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] })
const OPENAI_EMBEDDING_SETTINGS = {
  model: 'text-embedding-3-small',
  dimensions: 256,
} as const

const loadAllData = async (): Promise<Product[]> => {
  const rootPath = process.cwd()
  const dataPath = nodePath.join(rootPath, 'data', 'merged_data_with_embeddings.json')
  const fileContent = await fs.readFile(dataPath, 'utf8')
  return JSON.parse(fileContent)
}

export const GET = async (req: Request): Promise<Response> => {
  const { searchParams } = new URL(req.url)
  const searchQuery = searchParams.get('q')?.toLowerCase().trim()
  if (!searchQuery) {
    // TODO: better error handling
    // TODO: minimum length of 4 characters
    throw new Error('q is a required argument')
  }

  const allData = await loadAllData()
  const applyFilter = getFilterFn(searchParams)
  const topResults = await applyFilter(searchQuery, allData)

  const responseBody = { data: topResults }
  return new Response(JSON.stringify(responseBody), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  })
}

const getFilterFn = (searchParams: URLSearchParams): SearchFilterFn => {
  const filterType = searchParams.get('filterType')
  switch (filterType) {
    case 'similarity':
      return applySimilarityFilter
    default:
      return applyStringFilter
  }
}

type SearchFilterFn = (searchQuery: string, products: Product[]) => Promise<Product[]>

const applyStringFilter: SearchFilterFn = async (searchQuery, products) => {
  const matchingData = products.filter((product) => {
    const filterableString = [product['name'], product['description'], product['specifications']]
      .join(' ')
      .toLowerCase()
    return filterableString.includes(searchQuery)
  })
  return matchingData.slice(0, 3)
}

// TODO: better to do this with a vector db
const applySimilarityFilter: SearchFilterFn = async (searchQuery, products) => {
  const inputEmbedding = await generateEmbedding(searchQuery)
  const results = products
    .map((product) => {
      const similarity = cosineSimilarity(inputEmbedding, product.embedding)
      return {
        ...product,
        similarity,
      }
    })
    .sort((a, b) => b.similarity - a.similarity)

  return results.slice(0, 3)
}

const generateEmbedding = async (input: string): Promise<number[]> => {
  const res = await openAIClient.embeddings.create({
    input,
    ...OPENAI_EMBEDDING_SETTINGS,
  })
  return res.data[0].embedding
}

// thank you, chatGPT
const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}
