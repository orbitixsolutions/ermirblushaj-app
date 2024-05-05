'use client'

import { useTransition } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Albania, Italy, UnitedKingdom } from '@/assets/images/languages'

const LocalSwitcher = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const localActive = useLocale()

  const onSelectChange = (data: any) => {
    const nextLocale = data.currentKey
    startTransition(() => {
      router.replace(`/${nextLocale}`)
    })
  }

  const selectLanguage = () => {
    switch (localActive) {
      case 'it':
        return <Avatar size='sm' src={Italy.src} />
      case 'sq':
        return <Avatar size='sm' src={Albania.src} />
      case 'en':
        return <Avatar size='sm' src={UnitedKingdom.src} />
      default:
        return <Avatar size='sm' src={UnitedKingdom.src} />
    }
  }

  return (
    <Dropdown className='bg-custom-darkblue text-custom-white'>
      <DropdownTrigger>
        <Button
          isIconOnly
          radius='full'
          className='capitalize'
          isDisabled={isPending}
        >
          {selectLanguage()}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Language switcher'
        disallowEmptySelection
        selectionMode='single'
        defaultSelectedKeys={localActive}
        selectedKeys={[localActive]}
        onSelectionChange={onSelectChange}
      >
        <DropdownItem key='it' value='it'>
          <div className='flex gap-5 items-center font-bold'>
            <Avatar size='sm' src={Italy.src} />
            Italiano
          </div>
        </DropdownItem>
        <DropdownItem key='sq' value='sq'>
          <div className='flex gap-5 items-center font-bold'>
            <Avatar size='sm' src={Albania.src} />
            Albanense
          </div>
        </DropdownItem>
        <DropdownItem key='en' value='en'>
          <div className='flex gap-5 items-center font-bold'>
            <Avatar size='sm' src={UnitedKingdom.src} />
            Inglese
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default LocalSwitcher
