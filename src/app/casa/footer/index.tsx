import type { SpotifyPlaybackState } from '../../utils/spotify'
import { FooterPassword } from './password'

interface Props {
  playbackState?: SpotifyPlaybackState
}

export const Footer = ({ playbackState }: Props) => {
  const track = playbackState?.item
  const context = playbackState?.context

  return (
    <footer
      id='footer'
      className='flex flex-col items-center gap-2 text-sm mt-auto mb-8'
    >
      {track && playbackState?.is_playing && (
        <a
          className='no-underline hover:underline'
          href={context?.external_urls.spotify || track.external_urls.spotify}
          target='_blank'
          rel='noreferrer'
        >
          ♫ {track.artists[0].name} - {track.name}
        </a>
      )}
      <FooterPassword />
    </footer>
  )
}
