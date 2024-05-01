import { fetcher } from '@/helpers/fetcher'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import ButtonEighthPhase from '@/components/dashboard/dates/buttons/phases/button-eighth-phase'
import ButtonQuaterPhase from '@/components/dashboard/dates/buttons/phases/button-quarter-phase'
import ButtonSemifinalPhase from '@/components/dashboard/dates/buttons/phases/button-semifinal-phase'
import ButtonFinalPhase from '@/components/dashboard/dates/buttons/phases/button-final-phase'
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
      <Card className='bg-custom-green/30 border-2 border-custom-green p-4'>
        <CardBody>
          <h2 className='text-center text-custom-green/75 text-4xl text-balance font-bold'>
            Tournament is finished
          </h2>
        </CardBody>
      </Card>
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
