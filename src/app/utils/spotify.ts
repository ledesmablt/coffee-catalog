import axios from 'axios'

const {
  SPOTIFY_REFRESH_TOKEN = '',
  SPOTIFY_REDIRECT_URL = '',
  SPOTIFY_CLIENT_ID = '',
  SPOTIFY_CLIENT_SECRET = ''
} = process.env

interface ExternalURLs {
  spotify: string
}

export interface SpotifyTrack {
  uri: string
  name: string
  artists: {
    name: string
  }[]
  external_urls: ExternalURLs
}

export interface SpotifyPlaybackState {
  device: unknown
  context?: {
    external_urls: ExternalURLs
  }
  item?: SpotifyTrack
  is_playing: boolean
}

export const getSpotifyTopTracks = async (): Promise<SpotifyTrack[]> => {
  const res = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
    params: {
      time_range: 'short_term',
      limit: 10
    },
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`
    }
  })
  return res.data?.items || []
}

export const getSpotifyPlaybackState =
  async (): Promise<SpotifyPlaybackState> => {
    const res = await axios.get('https://api.spotify.com/v1/me/player', {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`
      }
    })

    return res.data
  }

const getAccessToken = async () => {
  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', SPOTIFY_REFRESH_TOKEN)
  params.append('redirect_uri', SPOTIFY_REDIRECT_URL)

  const authRes = await axios.post(
    'https://accounts.spotify.com/api/token',
    params,
    {
      auth: {
        username: SPOTIFY_CLIENT_ID,
        password: SPOTIFY_CLIENT_SECRET
      }
    }
  )
  return authRes.data.access_token
}
