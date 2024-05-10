import { deleteGroups } from '@/actions/services/delete'
import { fetcher } from '@/helpers/fetcher'
import { Group } from '@prisma/client'
import { useTransition } from 'react'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'

const useDeleteGroups = () => {
  const [isPendingGroups, starTransition] = useTransition()

  const { data: groups } = useSWR<Group[]>('/api/groups', fetcher)
  const emptyGroups = !groups?.length

  const handleDeleteGroups = async () => {
    if (emptyGroups) {
      return toast.error('There are not groups created!')
    }

    starTransition(async () => {
      const { status, message } = await deleteGroups()

      if (status === 200) {
        toast.success(message)
        mutate('/api/groups')
        return
      }

      toast.error('An ocurred a error!')
      return
    })
  }

  return { emptyGroups, isPendingGroups, handleDeleteGroups }
}

export default useDeleteGroups
