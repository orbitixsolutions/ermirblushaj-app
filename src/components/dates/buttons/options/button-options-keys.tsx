import {
  finishMatchesEights,
  finishMatchesQuarters
} from '@/actions/services/create'
import { fetcher } from '@/helpers/fetcher'
import { Button } from '@nextui-org/react'
import { Match, MatchKey, Team } from '@prisma/client'
import { useTransition } from 'react'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'

type ExtendedMatch = Match & {
  teamKeyA: Team
  teamKeyB: Team
}

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const ButtonOptionsKeys = () => {
  const [isPending, startTransition] = useTransition()

  const { data: matchesKey } = useSWR<ExtendedMatch[]>(
    '/api/matches/keys',
    fetcher
  )

  const { data: MATCHES_QUARTERS_A } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys/a/quarter',
    fetcher
  )
  const { data: MATCHES_QUARTERS_B } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys/b/quarter',
    fetcher
  )

  const checkAllMatchesCompleted = matchesKey?.filter(
    (match) => match.status === 'COMPLETED'
  )

  const handleFinishEighths = () => {
    startTransition(async () => {
      const { status, message } = await finishMatchesEights()
      if (status === 200) {
        toast.success(message)
        mutate('/api/matches/keys')
        mutate('/api/matches/keys/a')
        mutate('/api/matches/keys/b')
        return
      }

      toast.error('An occurred error while finishing matches!')
      return
    })
  }

  const handleFinisheQuarters = () => {
    startTransition(async () => {
      const { status, message } = await finishMatchesQuarters()
      if (status === 200) {
        toast.success(message)
        mutate('/api/matches/keys')
        mutate('/api/matches/keys/a')
        mutate('/api/matches/keys/b')
        return
      }

      toast.error('An occurred error while finishing matches!')
      return
    })
  }

  if (checkAllMatchesCompleted?.length !== 8) return

  return (
    <>
      {MATCHES_QUARTERS_A?.length === 4 && MATCHES_QUARTERS_B?.length === 4 && (
        <Button
          onPress={() => handleFinishEighths()}
          isLoading={isPending}
          color='danger'
          className='mx-auto bg-custom-red font-bold'
        >
          Finish Eights
        </Button>
      )}

      <Button
        onPress={() => handleFinisheQuarters()}
        isLoading={isPending}
        color='danger'
        className='mx-auto bg-custom-red font-bold'
      >
        Finish Quarters
      </Button>
    </>
  )
}

export default ButtonOptionsKeys
