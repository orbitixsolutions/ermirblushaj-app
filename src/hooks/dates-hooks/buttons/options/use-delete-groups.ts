import {
  deleteGroups,
  resetPlayerStats,
  resetTeamStats
} from '@/actions/services/delete'
import { fetcher } from '@/helpers/fetcher'
import { Match } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

const useDeleteGroups = () => {
  const [isPending, setIsPending] = useState(false)

  const { data: getGroups } = useSWR<Match[]>('/api/groups', fetcher)

  const handleDeleteGroups = async () => {
    if (!getGroups?.length) {
      setIsPending(false)
      return toast.error('There are not groups created!')
    }

    try {
      setIsPending(true)

      resetPlayerStats()
      resetTeamStats()

      deleteGroups()

      toast.success('All groups have been deleted!')
    } finally {
      setIsPending(false)
    }
  }

  return { isPending, handleDeleteGroups }
}

export default useDeleteGroups
