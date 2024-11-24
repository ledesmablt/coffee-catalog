import type { Metadata } from 'next'
import { Content } from './_components/Content'

export const metadata: Metadata = {
  title: 'Coffee Catalog PH',
  description: 'Coffee Catalog PH',
  openGraph: {},
}

const CoffeeCatalogPage = () => {
  return <Content />
}

export default CoffeeCatalogPage
