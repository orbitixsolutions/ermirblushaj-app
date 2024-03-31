import { deleteMatches } from '@/actions/services/delete'
import { fetcher } from '@/helpers/fetcher'
import { Match } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

const useDeleteMatches = () => {
  const [isPending, setIsPending] = useState(false)
  const { data: getMatches } = useSWR<Match[]>('/api/matches', fetcher, {
    revalidateOnFocus: true
  })

  const handleDeleteMatches = async () => {
    if (!getMatches?.length) {
      setIsPending(false)
      return toast.error('There are not matches created!')
    }

    const sendPromisesMatches = getMatches.map((matchup) =>
      deleteMatches(matchup.id)
    )

    try {
      setIsPending(true)
      const responsesMatches = await Promise.all(sendPromisesMatches)
      const allDeletedSuccessfully = responsesMatches.every(
        (response) => response.status === 200
      )

      if (allDeletedSuccessfully) {
        toast.success('All matches have been deleted!')
      } else {
        toast.error('Some matches could not be deleted.')
      }
    } catch (error) {
      toast.error('An error occurred!')
    } finally {
      setIsPending(false)
    }
  }

  return { isPending, handleDeleteMatches }
}

export default useDeleteMatches
