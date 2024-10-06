'use client'

import { useState } from 'react'

export const Password = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      id='wifi-password'
      className='text-center min-h-[48px]'
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <>
          <p>SSID: GlobeAtHome_0F800_5</p>
          <p>PW: JdrSQydn</p>
        </>
      ) : (
        <p>(tap to show WiFi password)</p>
      )}
    </div>
  )
}
