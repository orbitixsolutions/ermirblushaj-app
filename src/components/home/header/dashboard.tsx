'use client'

import { useCurrentUser } from '@/hooks/auth/use-current-user'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { toast } from 'sonner'

interface Props {
  contentDashboard: {
    title: string
    dashboard: string
    logout: string
  }
}

const Dashboard = ({ contentDashboard }: Props) => {
  const localte = useLocale()
  const session = useCurrentUser()

  const urlPrefix = `${localte}/dashboard`

  const signOutSession = async () => {
    toast.success('Logout successfully!')
    return await signOut()
  }

  if (!session) return

  return (
    <Dropdown className='bg-custom-darkblue text-custom-white'>
      <DropdownTrigger>
        <Button isIconOnly radius='full' className='capitalize'>
          <Avatar />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        <DropdownItem key='profile' className='h-14 gap-2'>
          <p className='font-semibold'>{contentDashboard.title}</p>
          <p className='font-semibold'>{session.email}</p>
        </DropdownItem>
        <DropdownItem key='copy' href={urlPrefix}>
          {contentDashboard.dashboard}
        </DropdownItem>
        <DropdownItem
          key='delete'
          onPress={() => signOutSession()}
          className='text-danger'
          color='danger'
        >
          {contentDashboard.logout}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default Dashboard
