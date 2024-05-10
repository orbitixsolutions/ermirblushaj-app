import { updatedGroupsFase } from '@/actions/services/edit'
import { useTransition } from 'react'
import { fetcher } from '@/helpers/fetcher'
import { Match } from '@prisma/client'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'

export const useFinishGroups = () => {
  const [isPendingFinish, startTransition] = useTransition()

  const { data: matches } = useSWR<Match[]>('/api/matches', fetcher)

  const completedMatches = matches?.every(
    (matchup) => matchup.status === 'COMPLETED'
  )

  const handleFinishGroups = async () => {
    startTransition(async () => {
      const { status, message } = await updatedGroupsFase()
      if (status === 200) {
        toast.success(message)
        mutate('/api/matches')
        return
      }
    })
  }

  return { completedMatches, isPendingFinish, handleFinishGroups }
}
