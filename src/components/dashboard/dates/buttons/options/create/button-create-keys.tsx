import { createKeys } from '@/actions/services/create'
import { fetcher } from '@/helpers/fetcher'
import { updatedData } from '@/helpers/updated-data'
import { Button, Spinner } from '@nextui-org/react'
import { Match } from '@prisma/client'
import { IconAlertCircle } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

const ButtonCreateKeys = () => {
  const [isPending, startTransition] = useTransition()

  const {
    data: matches,
    isLoading,
    error
  } = useSWR<Match[]>('/api/matches/keys', fetcher)
  const FULL_MATCHES = (matches?.length ?? 0) >= 8

  if (error)
    return (
      <Button
        fullWidth
        color='danger'
        startContent={<IconAlertCircle />}
        className='text-2xl bg-custom-red font-semibold text-slate-950'
      >
        Error load
      </Button>
    )

  if (isLoading)
    return (
      <Button
        fullWidth
        color='success'
        className='text-2xl font-semibold bg-custom-blue'
      >
        <Spinner color='default' />
      </Button>
    )

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
      fullWidth
      isLoading={isPending}
      isDisabled={FULL_MATCHES}
      onPress={() => handleCreateKeys()}
      className='text-2xl font-semibold bg-custom-blue text-custom-darknavy'
    >
      Generate
    </Button>
  )
}

export default ButtonCreateKeys
