import { fetcher } from '@/helpers/fetcher'
import { Spinner } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import ButtonEighthPhase from '@/components/dates/buttons/phases/button-eighth-phase'
import ButtonQuaterPhase from '@/components/dates/buttons/phases/button-quarter-phase'
import ButtonSemifinalPhase from '@/components/dates/buttons/phases/button-semifinal-phase'
import ButtonFinalPhase from '@/components/dates/buttons/phases/button-final-phase'
import useSWR from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const ButtonOptionsKeys = () => {
  const {
    data: matchesKey,
    isLoading,
    error
  } = useSWR<ExtendedMatchKey[]>('/api/matches/keys', fetcher)

  if (error)
    return (
      <h2 className='text-2xl text-center text-custom-red'>
        An ocurred a error.
      </h2>
    )
  if (isLoading) return <Spinner size='lg' />

  const finishedTournament = matchesKey?.every(
    (match) => match.matchStatus === 'FINISHED'
  )

  if (finishedTournament)
    return (
      <h2 className='text-center text-4xl font-bold'>
        Tournament is finished!
      </h2>
    )

  return (
    <>
      <ButtonEighthPhase />
      <ButtonQuaterPhase />
      <ButtonSemifinalPhase />
      <ButtonFinalPhase />
    </>
  )
}

export default ButtonOptionsKeys
