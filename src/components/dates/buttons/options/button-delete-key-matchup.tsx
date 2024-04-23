import { deleteKeyMatches } from '@/actions/services/delete'
import { Button } from '@nextui-org/react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonDeleteKeyMatchup = () => {
  const [isPending, startTransition] = useTransition()

  const handleDeleteKeyMatchup = () => {
    startTransition(async () => {
      const { status, message } = await deleteKeyMatches()
      
      if (status === 200) {
        mutate('/api/matches/keys/a')
        mutate('/api/matches/keys/b')
        toast.success(message)
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

export default ButtonDeleteKeyMatchup
