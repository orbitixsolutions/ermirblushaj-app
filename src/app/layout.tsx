import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import Providers from './Providers'
import './globals.css'

const DM_SANS_FONT = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ermirblushaj',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        id='body'
        className={`${DM_SANS_FONT.className} dark text-foreground bg-background`}
      >
        <Toaster position='bottom-right' richColors />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
