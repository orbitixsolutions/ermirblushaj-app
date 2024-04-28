import { fetcher } from '@/helpers/fetcher'
import { Spinner } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import useSWR from 'swr'
import ButtonEighthPhase from '../phases/button-eighth-phase'
import ButtonQuaterPhase from '../phases/button-quarter-phase'
import ButtonSemifinalPhase from '../phases/button-semifinal-phase'
import ButtonFinalPhase from '../phases/button-final-phase'

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

  if (error) return <p>Error</p>
  if (isLoading) return <Spinner size='lg' />

  const finishedTournament = matchesKey?.every(
    (match) => match.matchStatus === 'FINISHED'
  )

  if (finishedTournament)
    return <p className='text-center'>Tournament is finished</p>

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
