import nodePath from 'path'
import { promises as fs } from 'fs'
import { Brand } from '../../_types/schema'

export const loadBrands = async () => {
  const rootPath = process.cwd()
  const dataPath = nodePath.join(rootPath, 'data', 'roasters.json')
  const fileContent = await fs.readFile(dataPath, 'utf8')
  return (await JSON.parse(fileContent)) as Promise<Brand[]>
}
