'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Providers = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  )
}

export default Providers
