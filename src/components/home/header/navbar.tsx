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
import LocalSwitcher from './local-switcher'

interface Props {
  contentItems: {
    keys: string
    teams: string
    dates: string
    tables: string
    tribute: string
  }
}

const NavBar = ({ contentItems }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { url: '#keys', name: contentItems.keys },
    { url: '#teams', name: contentItems.teams },
    { url: '#dates', name: contentItems.dates },
    { url: '#tables', name: contentItems.tables }
  ]

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      className='bg-custom-navy border-b-[1px] border-custom-lightgray/50 text-custom-white py-5'
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand className='space-x-4'>
          <Image
            radius='none'
            src={BrandLogo.src}
            alt='Logo'
            className='w-32 md:w-40'
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {menuItems.map((items) => {
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
          <Button
            as={Link}
            href='/tribute'
            radius='sm'
            className='bg-custom-green font-bold'
          >
            {contentItems.tribute}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <LocalSwitcher />
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

export default NavBar
