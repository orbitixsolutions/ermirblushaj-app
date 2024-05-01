import { finishMatchesSemifinals } from '@/actions/services/create'
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

const ButtonSemifinalPhase = () => {
  const [isPending, startTransition] = useTransition()

  const { data: key_matches } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys',
    fetcher
  )
  const { data: semifinal_matches } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys?phase=semifinals&status=completed',
    fetcher
  )

  const SEMIFINALS = 2

  const status =
    (semifinal_matches?.length ?? 0) === SEMIFINALS &&
    semifinal_matches?.every((match) => match.status === 'COMPLETED')
  const semifinalPhase = key_matches?.length === 14 && status

  const handleFinish = () => {
    startTransition(async () => {
      const { status, message } = await finishMatchesSemifinals()
      if (status === 200) {
        toast.success(message)
        updatedData()
        return
      }

      toast.error('An occurred error while finishing matches!')
      return
    })
  }

  if (!semifinalPhase) return
  return (
    <Button
      onPress={() => handleFinish()}
      isLoading={isPending}
      color='danger'
      fullWidth
      className='mx-auto bg-custom-blue font-bold'
    >
      Finish Semifinal
    </Button>
  )
}

export default ButtonSemifinalPhase
