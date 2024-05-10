import { deleteMatches } from '@/actions/services/delete'
import { fetcher } from '@/helpers/fetcher'
import { Match } from '@prisma/client'
import { toast } from 'sonner'
import { useTransition } from 'react'
import useSWR, { mutate } from 'swr'

const useDeleteMatches = () => {
  const [isPendingMatches, startTransition] = useTransition()

  const { data: data_matches } = useSWR<Match[]>('/api/matches', fetcher)
  const emptyMatches = !data_matches || data_matches?.length === 0

  const handleDeleteMatches = async () => {
    if (emptyMatches) {
      return toast.error('There are not matches created!')
    }

    startTransition(async () => {
      const { status, message } = await deleteMatches()

      if (status === 200) {
        toast.success(message)
        mutate('/api/matches')
        return
      }

      toast.error('There was an error deleting the matches!')
      return
    })
  }

  return { emptyMatches, isPendingMatches, handleDeleteMatches }
}

export default useDeleteMatches
