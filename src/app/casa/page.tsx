import type { Metadata, NextPage } from 'next'
import { CasaContent } from './content'

export const metadata: Metadata = {
  title: 'Casa Ledesma',
  description: 'Welcome to Casa Ledesma',
  openGraph: {}
}

const CasaPage: NextPage = () => {
  return (
    <>
      <CasaContent />
    </>
  )
}

export default CasaPage
