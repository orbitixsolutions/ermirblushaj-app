import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import Providers from '@/app/[locale]/Providers'

import '../globals.css'

const DM_SANS_FONT = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Torneo EB - Memorial Ermir Ermirblushaj',
  description:
    "Ogni anno, Parma celebra con un campionato annuale (Torneo EB) il ricordo di Ermir Blushaj, una personalità significativa per la città. Questo evento non è solo una competizione, ma un'occasione per rafforzare i valori di comunità, integrità e amicizia."
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale} className='bg-custom-navy'>
      <body id='body' className={`${DM_SANS_FONT.className}`}>
        <Toaster position='bottom-right' richColors />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
