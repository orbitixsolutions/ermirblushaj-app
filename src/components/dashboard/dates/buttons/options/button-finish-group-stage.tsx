import { useTransition } from 'react'
import { updatedGroupsFase } from '@/actions/services/edit'
import { Button } from '@nextui-org/react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonFinishGroupStage = () => {
  const [isPending, startTransition] = useTransition()

  const handleFinishGroupStage = async () => {
    startTransition(async () => {
      const { status, message } = await updatedGroupsFase()
      if (status === 200) {
        toast.success(message)
        mutate('/api/matches')
        return
      }
    })
  }

  return (
    <Button
      onPress={() => handleFinishGroupStage()}
      isLoading={isPending}
      fullWidth
      className='text-2xl font-semibold bg-custom-blue text-custom-darknavy'
    >
      Finish
    </Button>
  )
}

export default ButtonFinishGroupStage
