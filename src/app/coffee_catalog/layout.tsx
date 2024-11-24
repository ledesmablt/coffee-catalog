'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// NOTE: not sure if this messes with SSR but let's see
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex flex-col items-center min-h-screen'>
      <div id='center-wrapper' className='flex flex-col items-center gap-2 my-16 w-[90%] max-w-[576px]'>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </div>
    </main>
  )
}

export default Layout
