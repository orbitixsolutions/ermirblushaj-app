'use client'

import { deleteGroups } from '@/actions/services/delete'
import { fetcher } from '@/helpers/fetcher'
import { Button } from '@nextui-org/react'
import { Group } from '@prisma/client'
import { useTransition } from 'react'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'

const ButtonDeleteGroups = () => {
  const [isPending, starTransition] = useTransition()
  const { data: groups } = useSWR<Group[]>('/api/groups', fetcher)

  const handleDeleteGroups = async () => {
    if (!groups?.length) {
      return toast.error('There are not groups created!')
    }

    starTransition(async () => {
      const { status, success } = await deleteGroups()
      if (status === 200) {
        toast.success(success)
        mutate('/api/groups')
        return
      }

      toast.error('An ocurred a error!')
      return
    })
  }

  return (
    <Button
      onPress={handleDeleteGroups}
      isLoading={isPending}
      color='danger'
      fullWidth
      className='text-2xl font-semibold bg-custom-red'
    >
      Delete
    </Button>
  )
}

export default ButtonDeleteGroups
