import { createKeys } from '@/actions/services/create'
import { updatedData } from '@/helpers/updated-data'
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
        updatedData()
        return
      }
      if (status === 409) {
        toast.error(message)
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
