'use client'

import { useState } from 'react'
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
  Image
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { BrandLogo } from '@/assets/images'
import { useLocale } from 'next-intl'
import LocalSwitcher from '@/components/home/header/local-switcher'
import Dashboard from '@/components/home/header/dashboard'

interface Props {
  contentItems: {
    keys: string
    teams: string
    dates: string
    tables: string
    tribute: string
  }
  contentDashboard: {
    title: string
    dashboard: string
    logout: string
  }
  matchKeys: any
}

const NavBar = ({ matchKeys, contentItems, contentDashboard }: Props) => {
  const data = matchKeys.data.length > 1

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const locale = useLocale()
  const pathname = usePathname()

  const menuItems = [
    {
      key: 'keys',
      url: data ? '#keys' : '#classification',
      name: contentItems.keys
    },
    { key: 'teams', url: `#teams`, name: contentItems.teams },
    { key: 'dates', url: '#dates', name: contentItems.dates },
    { key: 'classification', url: `#classification`, name: contentItems.tables }
  ]

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='bg-custom-navy border-b-[1px] border-custom-lightgray/50 text-custom-white py-5'
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand className='space-x-4'>
          <Link href='/'>
            <Image
              radius='none'
              alt='Logo'
              src={BrandLogo.src}
              className='w-32 md:w-40'
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {menuItems.map((items) => {
          return (
            <NavbarItem key={`${items.key}`}>
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
        <NavbarItem className='flex items-center gap-3'>
          <Button
            as={Link}
            href={`/${locale}/tribute`}
            radius='sm'
            className='bg-custom-green font-bold'
          >
            {contentItems.tribute}
          </Button>
          <LocalSwitcher />
          <Dashboard contentDashboard={contentDashboard} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className='bg-custom-darkblue text-custom-white mt-2 z-[1000]'>
        {menuItems.map((items) => (
          <NavbarMenuItem onClick={handleCloseMenu} key={`${items.key}`}>
            <Link
              onPress={() => handleCloseMenu()}
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

export default NavBar
