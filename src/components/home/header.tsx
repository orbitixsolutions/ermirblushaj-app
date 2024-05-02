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
  Avatar,
  Button
} from '@nextui-org/react'
import { usePathname } from 'next/navigation'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { url: '#keys', name: 'Keys' },
    { url: '#teams', name: 'Teams' },
    { url: '#dates', name: 'Dates' },
    { url: '#tables', name: 'Table of positions' },
    { url: '#tribute', name: 'Tribute' }
  ]

  return (
    <header>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        className='bg-custom-navy border-b-[1px] border-custom-lightgray/50 text-custom-white py-5'
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
          <NavbarBrand className='space-x-4'>
            <Avatar />
            <div className='flex flex-col items-start'>
              <h2 className='text-custom-green'>Memorial</h2>
              <p className='font-bold text-inherit'>Ermirblushaj</p>
            </div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          {menuItems.map((items) => (
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
          ))}
        </NavbarContent>

        <NavbarContent justify='end'>
          <NavbarItem>
            <Button radius='full' isIconOnly></Button>
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
    </header>
  )
}

export default Header
