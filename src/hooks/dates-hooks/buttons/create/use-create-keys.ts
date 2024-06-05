import { createKeys } from '@/actions/services/create'
import { fetcher } from '@/helpers/fetcher'
import { updatedData } from '@/helpers/updated-data'
import { Match } from '@prisma/client'
import { useTransition } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

export const useCreateKeys = () => {
  const [isPendingKeys, startTransition] = useTransition()

  const { data: matches } = useSWR<Match[]>('/api/matches/keys', fetcher)
  const fullMatchesKeys =
    (matches?.length ?? 0) >= 4 || (matches?.length ?? 0) >= 8

  const handleCreateKeys = async () => {
    if (fullMatchesKeys) {
      toast.error('The keys are already created!')
      return
    }

    startTransition(async () => {
      const { status, message, error } = await createKeys()

      if (status === 200) {
        toast.success(message)
        updatedData()
        return
      }

      toast.error(error)
    })
  }

  return { fullMatchesKeys, isPendingKeys, handleCreateKeys }
}
