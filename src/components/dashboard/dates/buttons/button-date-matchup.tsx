import { Button } from '@nextui-org/react'
import { Match, Team } from '@prisma/client'
import { IconCheck, IconPointFilled } from '@tabler/icons-react'
import useMatches from '@/hooks/matches-hooks/use-matches'
import ButtonFinishMatchup from '@/components/dashboard/dates/buttons/button-finish-matchup'
import { isCurrentDate } from '@/helpers/is-today'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const ButtonDateMatchup = ({ match }: { match: ExtendedMatch }) => {
  const { id, playStartDate, status } = match
  const dateFormatted = playStartDate?.replaceAll('-', '/')

  const isCompleted = status === 'COMPLETED'
  const isLived = status === 'LIVE'

  const { updatedId } = useMatches()

  const handleClickDate = () => {
    if (isCompleted) return
    updatedId(id)
  }

  if (isCompleted)
    return (
      <Button
        fullWidth
        startContent={<IconCheck />}
        className='bg-custom-darkblue text-custom-green font-bold'
      >
        Finished
      </Button>
    )

  if (isCurrentDate(dateFormatted!))
    return <ButtonFinishMatchup match={match} />

  return (
    <div className='flex items-center w-full'>
      <Button
        fullWidth
        onPress={handleClickDate}
        className='bg-custom-darkblue text-custom-white font-bold'
      >
        {dateFormatted ? dateFormatted : 'No date'}
      </Button>

      <div className='flex'>
        <IconPointFilled className='text-custom-red animate-pulse' />
        <p>Penidng</p>
      </div>
    </div>
  )
}

export default ButtonDateMatchup
