import { resetAllDates } from '@/actions/services/delete'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const useResetDates = () => {
  const [isPendingDates, startTransition] = useTransition()

  const handleResetDates = async () => {
    startTransition(async () => {
      const { status, success } = await resetAllDates()
      if (status === 200) {
        toast.success(success)
        mutate('/api/matches')
        return
      }

      toast.error('An ocurred a error!')
      return
    })
  }

  return { isPendingDates, handleResetDates }
}
export default useResetDates
