import './globals.css'
import type { Metadata } from 'next'

const BASE_URL = 'https://ledesmablt.com'

export const metadata: Metadata = {
  title: 'Benj Ledesma',
  description: 'i like building useful things.',
  openGraph: {
    url: BASE_URL,
    title: 'Benj Ledesma',
    images: `${BASE_URL}/images/me.jpeg`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
