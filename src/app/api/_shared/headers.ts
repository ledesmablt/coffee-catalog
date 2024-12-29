type Headers = ResponseInit['headers']
const DEFAULT_HEADERS: Headers = {
  'Content-Type': 'application/json',
}

interface BuildHeadersArgs {
  cacheDuration?: number
}
export const buildHeaders = ({ cacheDuration }: BuildHeadersArgs = {}) => {
  const headers: Headers = { ...DEFAULT_HEADERS }

  if (cacheDuration) {
    // # of seconds data is considered "fresh"
    headers['Cache-Control'] = `public, s-maxage=${cacheDuration}`
    headers['CDN-Cache-Control'] = `public, s-maxage=${cacheDuration * 60}`
  }

  return headers
}
