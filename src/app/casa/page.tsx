import type { Metadata } from 'next'
import { Content } from './_components/Content'
import { Footer } from './_components/Footer'

import { getSpotifyPlaybackState } from '@/shared/spotify'

export const metadata: Metadata = {
  title: 'Casa Ledesma',
  description: 'Welcome to Casa Ledesma',
  openGraph: {},
}

// refresh playback state every 30s
export const revalidate = 30

const CasaPage = async () => {
  const playbackState = await getSpotifyPlaybackState()

  return (
    <main className='flex flex-col items-center font-serif min-h-screen'>
      <Content />
      <Footer playbackState={playbackState} />
    </main>
  )
}

export default CasaPage
