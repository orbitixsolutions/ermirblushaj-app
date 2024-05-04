'use client'

import { Button, Spinner } from '@nextui-org/react'
import { fetcher } from '@/helpers/fetcher'
import { Match } from '@prisma/client'
import { IconAlertCircle } from '@tabler/icons-react'
import useCreateGroups from '@/hooks/dates-hooks/buttons/options/use-create-groups'
import useSWR from 'swr'

const ButtonCreateGroups = () => {
  const { isPending, handleCreateGroups } = useCreateGroups()
  
  const {
    data: matches,
    isLoading,
    error
  } = useSWR<Match[]>('/api/groups', fetcher)  
  const FULL_MATCHES = matches?.length === 4

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

  return (
    <Button
      color='success'
      fullWidth
      isLoading={isPending}
      isDisabled={FULL_MATCHES}
      onPress={() => handleCreateGroups()}
      className='text-2xl font-semibold bg-custom-blue'
    >
      Sort
    </Button>
  )
}

export default ButtonCreateGroups
