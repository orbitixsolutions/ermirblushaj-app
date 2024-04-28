import { deleteKeyMatches } from '@/actions/services/delete'
import { updatedData } from '@/helpers/updated-data'
import { Button } from '@nextui-org/react'
import { useTransition } from 'react'
import { toast } from 'sonner'

const ButtonDeleteKeyMatches = () => {
  const [isPending, startTransition] = useTransition()

  const handleDeleteKeyMatchup = () => {
    startTransition(async () => {
      const { status, message } = await deleteKeyMatches()

      if (status === 200) {
        toast.success(message)
        updatedData()
        return
      }

      if (status === 409) {
        toast.error(message)
        return
      }

      toast.error('An occurred error while deleting matches!')
      return
    })
  }

  return (
    <Button
      onPress={handleDeleteKeyMatchup}
      isLoading={isPending}
      className='mx-auto bg-custom-red font-bold'
    >
      Delete Matches
    </Button>
  )
}

export default ButtonDeleteKeyMatches
