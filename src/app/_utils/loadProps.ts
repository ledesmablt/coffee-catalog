import { db } from '@/db'
import { brands as brandsTable } from '@/db/schema'
import { Props } from '../_components/Content'

export const loadProps = async (): Promise<Props> => {
  const brands = await db.select().from(brandsTable)

  return {
    brands,
  }
}
