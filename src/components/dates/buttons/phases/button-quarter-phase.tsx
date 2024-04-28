import { finishMatchesQuarters } from '@/actions/services/create'
import { fetcher } from '@/helpers/fetcher'
import { updatedData } from '@/helpers/updated-data'
import { Button } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import { useTransition } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const ButtonQuaterPhase = () => {
  const [isPending, startTransition] = useTransition()

  const { data: key_matches } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys',
    fetcher
  )
  const { data: quarter_matches } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys?phase=quarter&status=completed',
    fetcher
  )

  const QUARTERS = 4

  const status =
    (quarter_matches?.length ?? 0) === QUARTERS &&
    quarter_matches?.every((match) => match.status === 'COMPLETED')
  const quarterPhase = key_matches?.length === 12 && status

  const handleFinish = () => {
    startTransition(async () => {
      const { status, message } = await finishMatchesQuarters()
      if (status === 200) {
        toast.success(message)
        updatedData()
        return
      }

      toast.error('An occurred error while finishing matches!')
      return
    })
  }

  if (!quarterPhase) return

  return (
    <Button
      onPress={() => handleFinish()}
      isLoading={isPending}
      color='danger'
      className='mx-auto bg-custom-red font-bold'
    >
      Finish Quarters
    </Button>
  )
}

export default ButtonQuaterPhase
