import {
  finishFinal,
  finishMatchesEights,
  finishMatchesQuarters,
  finishMatchesSemifinals
} from '@/actions/services/create'
import { fetcher } from '@/helpers/fetcher'
import { Button, Spinner } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import { useTransition } from 'react'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const ButtonOptionsKeys = () => {
  const [isPending, startTransition] = useTransition()

  const {
    data: matchesKey,
    isLoading,
    error
  } = useSWR<ExtendedMatchKey[]>('/api/matches/keys', fetcher)

  if (error) return <p>Error</p>
  if (isLoading) return <Spinner size='lg' />

  const eightPhase = matchesKey?.length === 8
  const quarterPhase = matchesKey?.length === 12
  const semifinalPhase = matchesKey?.length === 14
  const finalPhase = matchesKey?.length === 15

  const finishedTournament = matchesKey?.every(
    (match) => match.matchStatus === 'FINISHED'
  )

  const handleFinishEighths = () => {
    startTransition(async () => {
      const { status, message } = await finishMatchesEights()
      if (status === 200) {
        toast.success(message)
        mutate('/api/matches/keys')
        mutate('/api/matches/keys/a')
        mutate('/api/matches/keys/b')
        mutate('/api/matches/keys/a/quarter')
        mutate('/api/matches/keys/b/quarter')
        mutate('/api/matches/keys/a/semifinals')
        mutate('/api/matches/keys/b/semifinals')
        mutate('/api/matches/keys/final')
        mutate('/api/matches/keys/top')
        return
      }

      toast.error('An occurred error while finishing matches!')
      return
    })
  }

  const handleFinishedQuarters = () => {
    startTransition(async () => {
      const { status, message } = await finishMatchesQuarters()
      if (status === 200) {
        toast.success(message)
        mutate('/api/matches/keys')
        mutate('/api/matches/keys/a')
        mutate('/api/matches/keys/b')
        mutate('/api/matches/keys/a/quarter')
        mutate('/api/matches/keys/b/quarter')
        mutate('/api/matches/keys/a/semifinals')
        mutate('/api/matches/keys/b/semifinals')
        mutate('/api/matches/keys/final')
        mutate('/api/matches/keys/top')
        return
      }

      toast.error('An occurred error while finishing matches!')
      return
    })
  }

  const handleFinishedSemifinals = () => {
    startTransition(async () => {
      const { status, message } = await finishMatchesSemifinals()
      if (status === 200) {
        toast.success(message)
        mutate('/api/matches/keys')
        mutate('/api/matches/keys/a')
        mutate('/api/matches/keys/b')
        mutate('/api/matches/keys/a/quarter')
        mutate('/api/matches/keys/b/quarter')
        mutate('/api/matches/keys/a/semifinals')
        mutate('/api/matches/keys/b/semifinals')
        mutate('/api/matches/keys/final')
        mutate('/api/matches/keys/top')
        return
      }

      toast.error('An occurred error while finishing matches!')
      return
    })
  }

  const hanldeFinishedFinals = () => {
    startTransition(async () => {
      const { status, message } = await finishFinal()
      if (status === 200) {
        toast.success(message)
        mutate('/api/matches/keys')
        mutate('/api/matches/keys/a')
        mutate('/api/matches/keys/b')
        mutate('/api/matches/keys/a/quarter')
        mutate('/api/matches/keys/b/quarter')
        mutate('/api/matches/keys/a/semifinals')
        mutate('/api/matches/keys/b/semifinals')
        mutate('/api/matches/keys/final')
        mutate('/api/matches/keys/top')
        return
      }

      toast.error('An occurred error while finishing matches!')
      return
    })
  }

  if (finishedTournament)
    return <p className='text-center'>Tournament is finished</p>

  return (
    <>
      {eightPhase && (
        <Button
          onPress={() => handleFinishEighths()}
          isLoading={isPending}
          color='danger'
          className='mx-auto bg-custom-red font-bold'
        >
          Finish Eights
        </Button>
      )}

      {quarterPhase && (
        <Button
          onPress={() => handleFinishedQuarters()}
          isLoading={isPending}
          color='danger'
          className='mx-auto bg-custom-red font-bold'
        >
          Finish Quarters
        </Button>
      )}
      {semifinalPhase && (
        <Button
          onPress={() => handleFinishedSemifinals()}
          isLoading={isPending}
          color='danger'
          className='mx-auto bg-custom-red font-bold'
        >
          Finish Semifinals
        </Button>
      )}

      {finalPhase && (
        <Button
          onPress={() => hanldeFinishedFinals()}
          isLoading={isPending}
          color='danger'
          className='mx-auto bg-custom-red font-bold'
        >
          Finish Finals
        </Button>
      )}
    </>
  )
}

export default ButtonOptionsKeys
