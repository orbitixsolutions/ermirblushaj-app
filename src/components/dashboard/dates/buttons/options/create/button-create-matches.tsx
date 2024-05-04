'use client'

import { Button, Spinner } from '@nextui-org/react'
import { fetcher } from '@/helpers/fetcher'
import { Match } from '@prisma/client'
import { IconAlertCircle } from '@tabler/icons-react'
import useCreateMatches from '@/hooks/dates-hooks/buttons/options/use-create-matches'
import useSWR from 'swr'

const ButtonCreateMatches = () => {
  const { isPending, handleCreateMatches } = useCreateMatches()

  const {
    data: matches,
    isLoading,
    error
  } = useSWR<Match[]>('/api/matches', fetcher)
  const FULL_MATCHES = (matches?.length ?? 0) === 40

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
      fullWidth
      isLoading={isPending}
      isDisabled={FULL_MATCHES}
      onPress={() => handleCreateMatches()}
      className='text-2xl font-semibold bg-custom-blue text-custom-darknavy'
    >
      Generate
    </Button>
  )
}

export default ButtonCreateMatches
