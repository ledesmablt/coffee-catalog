import nodePath from 'path'
import { promises as fs } from 'fs'
import type { Product } from '../../_types/schema'

const DATA_FILES = ['yardstick.json'] as const

const loadAllData = async (): Promise<Product[]> => {
  const rootPath = process.cwd()
  const allData = await Promise.all(
    DATA_FILES.map(async (filename) => {
      const filePath = nodePath.join(rootPath, 'data', filename)
      const fileData = await fs.readFile(filePath, 'utf8')
      return JSON.parse(fileData) as Product[] // NOTE: improve this with zod validation
    }),
  )
  return allData.flatMap((products) => products)
}

export const GET = async (req: Request): Promise<Response> => {
  const { searchParams } = new URL(req.url)
  const searchQuery = searchParams.get('q')?.toLowerCase().trim()
  if (!searchQuery) {
    // TODO: better error handling
    // TODO: minimum length of 4 characters
    throw new Error('q is a required argument')
  }

  // TODO: handle filtering with genAI, or also some combination of plain text filtering.
  const allData = await loadAllData()
  const matchingData = allData.filter((product) => {
    const filterableString = [product['name'], product['description'], product['specifications']]
      .join(' ')
      .toLowerCase()
    return filterableString.includes(searchQuery)
  })

  const responseBody = { data: matchingData }
  return new Response(JSON.stringify(responseBody), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  })
}
