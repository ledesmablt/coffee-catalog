'use client'

import React, { useState } from 'react'

const Divider = () => <div className='w-20 border-t-zinc-400 border-t my-6' />

export const CasaContent = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className='flex flex-col items-center font-serif min-h-screen'>
      <div className='flex flex-col items-center gap-2 my-16 w-[90%] max-w-[576px]'>
        <h1 id='page-title' className='text-xl'>
          Casa Ledesma
        </h1>

        <Divider />

        <section id='menu' className='flex flex-col items-center'>
          <h4 className='text-lg italic'>menu</h4>

          <div className='flex flex-col items-center mt-6 gap-4'>
            <div className='flex flex-col items-center'>
              <p>espresso tonic, iced</p>
              <p className='text-sm'>your choice of dark or citrusy</p>
            </div>

            <p>chamomile tea latte, iced</p>

            <p>pour-over coffee, iced or hot</p>

            <p>i can't believe it's not kombucha</p>
          </div>
        </section>
      </div>
      <footer
        id='footer'
        className='flex items-center text-sm mt-auto mb-8 min-h-[48px]'
        onClick={() => setShowPassword(!showPassword)}
      >
        <div id='wifi-password' className='text-center'>
          {showPassword ? (
            <>
              <p>SSID: GlobeAtHome_0F800_5</p>
              <p onClick={() => setShowPassword(!showPassword)}>PW: JdrSQydn</p>
            </>
          ) : (
            <p>(tap to show WiFi password)</p>
          )}
        </div>
      </footer>
    </main>
  )
}
