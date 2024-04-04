import { formattedDate } from '@/helpers/get-formated-date'
import { Button } from '@nextui-org/react'
import { Match, Team } from '@prisma/client'
import { useEffect, useState } from 'react'
import { updateStatusMatches } from '@/actions/services/edit'
import { IconPointFilled } from '@tabler/icons-react'
import useMatches from '@/hooks/matches-hooks/use-matches'
import ButtonStartMatchup from './button-start-matchup'
import axios from 'axios'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const ButtonDateMatchup = ({ match }: { match: ExtendedMatch }) => {
  const { id, playStartDate } = match
  const [matchId, setGameId] = useState('')
  const gameId = matchId === match.id

  const { isToday, updateIsActive, updatedId, updatedTodayGame } = useMatches()

  const playDateFomatted = formattedDate({
    date: playStartDate || '',
    mode: { time: 'full-date' }
  })

  const handleClickDate = () => {
    updateIsActive(true)
    updatedId(id)
  }

  useEffect(() => {
    const checkMatchIsToday = () => {
      const playDate = new Date(playStartDate || '')
      const currentData = new Date()

      const isTodayDate = playDate.toDateString() === currentData.toDateString()

      if (id) {
        updatedTodayGame(true)
        if (isTodayDate) {
          axios.get(`/api/matches/${id}`).then((res) => {
            const data = res.data

            setGameId(data.id)
            updateStatusMatches(data.id, 'LIVE')
          })
        }
      }
    }

    checkMatchIsToday()
  }, [playStartDate])

  return (
    <>
      {isToday && gameId ? (
        <ButtonStartMatchup />
      ) : (
        <div className='w-full flex'>
          <Button
            onPress={() => handleClickDate()}
            size='sm'
            fullWidth
            className='bg-custom-darkblue rounded-lg cursor-pointer text-white'
          >
            <span className='text-sm font-bold'>
              {!playStartDate ? 'No date' : playDateFomatted}
            </span>
          </Button>
          <div className='flex items-center'>
            <IconPointFilled className='text-custom-red animate-pulse' />
            <p>Live</p>
          </div>
        </div>
      )}
    </>
  )
}

export default ButtonDateMatchup
