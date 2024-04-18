import { createKeys } from '@/actions/services/create'
import { Button } from '@nextui-org/react'
import { useTransition } from 'react'
import { toast } from 'sonner'

const ButtonCreateKeys = () => {
  const [isPending, startTransition] = useTransition()

  const handleCreateKeys = async () => {
    startTransition(async () => {
      const { status, message } = await createKeys()
      if (status === 200) {
        toast.success(message)
        return
      }
    })
  }

  return (
    <Button
      onPress={() => handleCreateKeys()}
      isLoading={isPending}
      fullWidth
      className='text-2xl font-semibold bg-custom-blue text-custom-darknavy'
    >
      Generate
    </Button>
  )
}

export default ButtonCreateKeys
