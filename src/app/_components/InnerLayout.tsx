'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { Suspense } from 'react'

const queryClient = new QueryClient()

// NOTE: not sure if this messes with SSR but let's see
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='flex flex-col items-center min-h-screen'>
        <div
          id='center-wrapper'
          className='flex flex-col items-center gap-2 my-8 w-[90%] max-w-[576px] md:max-w-[960px]'
        >
          <Nav />
          <Suspense>{children}</Suspense>
          <Footer />
        </div>
      </main>
    </QueryClientProvider>
  )
}

export default Layout
