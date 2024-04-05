import { formattedDate } from '@/helpers/get-formated-date'
import { Button } from '@nextui-org/react'
import { Match, Team } from '@prisma/client'
import { useEffect, useState } from 'react'
import { updateStatusMatches } from '@/actions/services/edit'
import { IconPointFilled } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import useMatches from '@/hooks/matches-hooks/use-matches'
import ButtonFinishMatchup from '@/components/dates/buttons/button-finish-matchup'
import axios from 'axios'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const ButtonDateMatchup = ({ match }: { match: ExtendedMatch }) => {
  const router = useRouter()
  const { id, playStartDate, status } = match
  const [matchId, setGameId] = useState('')

  const gameId = matchId === match.id
  const isLived = status === 'LIVE'
  const isCompleted = status === 'COMPLETED'

  const { isToday, updateIsActive, updatedId, updatedTodayGame } = useMatches()

  const playDateFomatted = formattedDate({
    date: playStartDate || '',
    mode: { time: 'full-date' }
  })

  const handleClickDate = () => {
    if (isCompleted) return

    updateIsActive(true)
    updatedId(id)
  }

  useEffect(() => {
    if (isCompleted) return

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

            updatedTodayGame(false)
            console.log('uwu')
          })
        }
      }
    }

    checkMatchIsToday()
  }, [status])

  return (
    <>
      {isToday && gameId && isLived ? (
        <ButtonFinishMatchup match={match} />
      ) : (
        <div className='w-full flex'>
          <Button
            onPress={() => handleClickDate()}
            size='sm'
            fullWidth
            className='bg-custom-darkblue rounded-lg cursor-pointer text-white'
          >
            <p className='text-sm font-bold'>
              {status === 'COMPLETED' ? (
                <span className='text-lime-500'>Finished</span>
              ) : !playStartDate ? (
                'No date'
              ) : (
                playDateFomatted
              )}
            </p>
          </Button>
          {status === 'LIVE' && (
            <div className='flex items-center'>
              <IconPointFilled className='text-custom-red animate-pulse' />
              <p>Live</p>
            </div>
          )}
          {status === 'PENDING' && (
            <div className='flex items-center'>
              <IconPointFilled className='text-custom-red animate-pulse' />
              <p>Live</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ButtonDateMatchup
