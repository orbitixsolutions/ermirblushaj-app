import { formattedDate } from '@/helpers/get-formated-date'
import { Button } from '@nextui-org/react'
import { Match, Team } from '@prisma/client'
import useMatches from '@/hooks/matches-hooks/use-matches'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const ButtonDateMatchup = ({ item }: { item: ExtendedMatch }) => {
  const {  updateIsActive, updatedId } = useMatches()

  const playDateFomatted = formattedDate({
    date: item.playDate || '',
    mode: { time: 'full-date' }
  })

  const handleClickDate = () => {
    updateIsActive(true)
    updatedId(item.id)
  }

  return (
    <Button
      onPress={() => handleClickDate()}
      size='sm'
      className='col-span-4 bg-custom-navy rounded-lg cursor-pointer text-white'
    >
      <span className='text-sm font-bold'>
        {!item.playDate ? 'No date' : playDateFomatted}
      </span>
    </Button>
  )
}

export default ButtonDateMatchup
