'use client'

import { resetAllStats } from '@/actions/services/delete'
import { Button } from '@nextui-org/react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonDeleteStats = () => {
  const [isPending, startTransition] = useTransition()

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

  return (
    <Button
      onPress={() => handleResetStats()}
      fullWidth
      color='danger'
      isLoading={isPending}
      className='text-2xl font-semibold bg-custom-red'
    >
      Reset
    </Button>
  )
}

export default ButtonDeleteStats
