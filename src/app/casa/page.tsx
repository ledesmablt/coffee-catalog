import type { Metadata } from 'next'
import { Content } from './content'
import { Footer } from './footer'

export const metadata: Metadata = {
  title: 'Casa Ledesma',
  description: 'Welcome to Casa Ledesma',
  openGraph: {},
}

const CasaPage = async () => {
  return (
    <main className='flex flex-col items-center font-serif min-h-screen'>
      <Content />
      <Footer />
    </main>
  )
}

export default CasaPage
