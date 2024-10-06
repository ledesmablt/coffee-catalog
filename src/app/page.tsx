import { Content } from './_components/Content'
import { Nav } from './_components/Nav'
import { getSpotifyTopTracks } from '@/shared/spotify'

// revalidate every 12 hrs (12 * 60 * 60)
export const revalidate = 43200

const HomePage = async () => {
  const topTracks = await getSpotifyTopTracks()

  return (
    <>
      <main className='flex flex-col items-center leading-tight'>
        <div className='flex flex-col items-center gap-5 my-10 w-[90%] max-w-[576px]'>
          <Nav />
          <Content topTracks={topTracks} />
        </div>
      </main>
    </>
  )
}

export default HomePage
