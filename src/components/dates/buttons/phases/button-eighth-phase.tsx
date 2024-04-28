import { finishMatchesEights } from '@/actions/services/create'
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

const ButtonEighthPhase = () => {
  const [isPending, startTransition] = useTransition()

  const { data: key_matches } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys',
    fetcher
  )
  const { data: eighths_matches } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys?phase=eighth&status=completed',
    fetcher
  )

  const EIGHTHS = 8

  const status =
    (eighths_matches?.length ?? 0) === EIGHTHS &&
    eighths_matches?.every((match) => match.status === 'COMPLETED')
  const eightPhase = key_matches?.length === 8 && status

  const handleFinish = () => {
    startTransition(async () => {
      const { status, message } = await finishMatchesEights()
      if (status === 200) {
        toast.success(message)
        updatedData()
        return
      }

      toast.error('An occurred error while finishing matches!')
      return
    })
  }

  if (!eightPhase) return

  return (
    <Button
      onPress={() => handleFinish()}
      isLoading={isPending}
      color='danger'
      className='mx-auto bg-custom-red font-bold'
    >
      Finish Eights
    </Button>
  )
}

export default ButtonEighthPhase
