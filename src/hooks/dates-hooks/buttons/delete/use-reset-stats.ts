import { resetAllStats } from '@/actions/services/delete'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const useResetStats = () => {
  const [isPendingStats, startTransition] = useTransition()

  const handleResetStats = async () => {
    startTransition(async () => {
      const { status, success } = await resetAllStats()
      if (status === 200) {
        toast.success(success)
        mutate('/api/matches')
        return
      }

      toast.error('An ocurred a error!')
      return
    })
  }

  return { isPendingStats, handleResetStats }
}
export default useResetStats
