'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Tooltip
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { IconArrowBarRight } from '@tabler/icons-react'
import { useCurrentUser } from '@/hooks/auth/use-current-user'
import { useLocale } from 'next-intl'

const NavigationMenu = () => {
  const locale = useLocale()
  const urlPrefix = `${locale}/dashboard`

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useCurrentUser()
  const pathname = usePathname()

  const signOutSession = async () => {
    await signOut()
  }

  const menuItems = [
    { url: `/${urlPrefix}`, name: 'Home', role: 'ADMIN' },
    { url: `/${urlPrefix}/new`, name: 'Teams/Players', role: 'ADMIN' },
    { url: `/${urlPrefix}/gallery`, name: 'Gallery', role: 'ADMIN' },
    { url: `/${urlPrefix}/dates`, name: 'Dates', role: 'ADMIN' },
    { url: `/${urlPrefix}/admin`, name: 'Admin', role: 'OWNER' }
  ]

  return (
    <Navbar
      shouldHideOnScroll
      className='bg-custom-green rounded-2xl'
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <p className='font-bold text-inherit'>Ermirblushaj</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {menuItems.map((items) => {
          if (items.role === 'OWNER' && user?.role !== 'OWNER') {
            return null
          }

          return (
            <NavbarItem key={`${items.url}`}>
              <Link
                className={`text-custom-white ${
                  pathname === items.url ? 'underline' : ''
                } `}
                href={items.url}
                size='lg'
              >
                {items.name}
              </Link>
            </NavbarItem>
          )
        })}
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          <Tooltip content='Logout'>
            <Button
              isIconOnly
              onPress={() => signOutSession}
              color='danger'
              variant='flat'
            >
              <IconArrowBarRight />
            </Button>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className='bg-custom-darkblue text-custom-white mt-2 z-[1000]'>
        {menuItems.map((items) => (
          <NavbarMenuItem key={`${items.url}`}>
            <Link
              className={`text-custom-white ${
                pathname === items.url ? 'text-custom-green' : ''
              } `}
              href={items.url}
              size='lg'
            >
              {items.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default NavigationMenu
