'use client'

import { Button } from '@nextui-org/react'
import useDeleteMatches from '@/hooks/dates-hooks/buttons/options/use-delete-matches'
import useSWR, { mutate } from 'swr'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { Match } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import { deleteMatches } from '@/actions/services/delete'

const ButtonDeleteMatches = () => {
  const [isPending, starTransition] = useTransition()
  const { data: matches } = useSWR<Match[]>('/api/matches', fetcher)

  const EMPTY_MATCHES = !matches?.length

  const handleDeleteMatches = async () => {
    if (EMPTY_MATCHES) {
      return toast.error('There are not matches created!')
    }

    starTransition(async () => {
      const { status, success } = await deleteMatches()
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
      fullWidth
      color='danger'
      isLoading={isPending}
      isDisabled={EMPTY_MATCHES}
      onPress={() => handleDeleteMatches()}
      className='text-2xl font-semibold bg-custom-red'
    >
      Delete
    </Button>
  )
}

export default ButtonDeleteMatches
