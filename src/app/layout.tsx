import './globals.css'
import type { Metadata } from 'next'
import InnerLayout from './_components/InnerLayout'

export const metadata: Metadata = {
  title: 'Coffee Catalog PH',
  description: 'Coffee Catalog PH',
  openGraph: {},
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <InnerLayout>{children}</InnerLayout>
      </body>
    </html>
  )
}
