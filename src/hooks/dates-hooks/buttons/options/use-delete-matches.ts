import { deleteMatches } from '@/actions/services/delete'
import { fetcher } from '@/helpers/fetcher'
import { Match } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

const useDeleteMatches = () => {
  const [isPending, setIsPending] = useState(false)
  const { data: getMatches } = useSWR<Match[]>('/api/matches', fetcher)

  const handleDeleteMatches = async () => {
    if (!getMatches?.length) {
      setIsPending(false)
      return toast.error('There are not matches created!')
    }

    try {
      setIsPending(true)
      deleteMatches()

      toast.success('All machtes have been deleted!')
    } finally {
      setIsPending(false)
    }
  }

  return { isPending, handleDeleteMatches }
}

export default useDeleteMatches
