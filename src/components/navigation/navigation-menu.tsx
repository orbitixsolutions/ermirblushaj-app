'use client'

import { useCurrentUser } from '@/hooks/auth/use-current-user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavigationMenu = () => {
  const pathname = usePathname()

  const user = useCurrentUser()

  const items = [
    { url: '/dashboard', name: 'Home', role: 'ADMIN' },
    { url: '/dashboard/new', name: 'Teams/Players', role: 'ADMIN' },
    { url: '/dashboard/gallery', name: 'Gallery', role: 'ADMIN' },
    { url: '/dashboard/dates', name: 'Dates', role: 'ADMIN' },
    { url: '/dashboard/admin', name: 'Admin', role: 'OWNER' }
  ]

  return (
    <header>
      <nav className='flex justify-center'>
        <ul className='bg-custom-green flex p-8 gap-4 rounded-xl'>
          {items.map((links) => {
            if (links.role === 'OWNER' && user?.role !== 'OWNER') {
              return null
            }
            return (
              <li key={links.name}>
                {}

                <Link
                  className={`px-8 py-4 rounded-xl text-xl ${
                    links.url === pathname
                      ? 'bg-blue-500'
                      : 'border-[1px] border-white'
                  }`}
                  key={links.name}
                  href={links.url}
                >
                  {links.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default NavigationMenu
