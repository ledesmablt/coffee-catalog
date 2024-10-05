import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const BASE_URL = 'https://ledesmablt.com'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Benj Ledesma</title>
        <meta property='og:url' content={BASE_URL} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Benj Ledesma' />
        <meta property='og:image' content={`${BASE_URL}/images/me.jpeg`} />
        <meta
          property='og:description'
          content='i like building useful things.'
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
