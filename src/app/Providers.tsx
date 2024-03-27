'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </NextUIProvider>
  )
}

export default Providers
