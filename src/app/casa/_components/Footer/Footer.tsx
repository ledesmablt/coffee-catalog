import type { SpotifyPlaybackState } from '@/shared/spotify'
import { Password } from './Password'

interface Props {
  playbackState?: SpotifyPlaybackState
}

export const Footer = ({ playbackState }: Props) => {
  const track = playbackState?.item
  const context = playbackState?.context

  const getNowPlayingUrl = () => {
    const likedSongsUrl = 'https://open.spotify.com/collection/tracks'
    const contextUrl = context?.external_urls.spotify
    const contextIsPrivate = contextUrl === likedSongsUrl

    if (!contextUrl || contextIsPrivate) {
      return track?.external_urls.spotify
    }

    return contextUrl
  }

  return (
    <footer id='footer' className='flex flex-col items-center gap-2 text-sm mt-auto mb-8'>
      {track && playbackState?.is_playing && (
        <a className='no-underline hover:underline' href={getNowPlayingUrl()} target='_blank' rel='noreferrer'>
          ♫ {track.artists[0].name} - {track.name}
        </a>
      )}
      <Password />
    </footer>
  )
}
