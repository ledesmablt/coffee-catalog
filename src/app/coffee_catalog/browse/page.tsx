import type { Metadata } from 'next'
import { Content } from './_components/Content'
import { loadProps } from './_utils/loadProps'

export const metadata: Metadata = {
  title: 'Coffee Catalog PH',
  description: 'Coffee Catalog PH',
  openGraph: {},
}

const CoffeeCatalogBrowsePage = async () => {
  const props = await loadProps()
  return <Content {...props} />
}

export default CoffeeCatalogBrowsePage
