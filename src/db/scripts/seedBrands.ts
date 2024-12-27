import nodePath from 'path'
import { promises as fs } from 'fs'

import { db } from '..'
import { brands } from '../schema'

const main = async () => {
  const rootPath = process.cwd()
  const dataPath = nodePath.join(rootPath, 'data', 'roasters.json')
  const fileContent = await fs.readFile(dataPath, 'utf8')

  const values = JSON.parse(fileContent)
  const result = await db.insert(brands).values(values).returning({ insertedId: brands.id })
  console.log(`inserted ${result.length} rows into 'brands'`)
}

main()
