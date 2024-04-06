import { updatedFinishStats } from '@/actions/services/edit'
import { Match, Team } from '@prisma/client'
import { Button } from '@nextui-org/react'
import { IconPointFilled } from '@tabler/icons-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { formattedDate } from '@/helpers/get-formated-date'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const ButtonFinishMatchup = ({ match }: { match: ExtendedMatch }) => {
  const [isPending, setIsPending] = useState(false)
  const { playStartDate, status } = match

  const playDate = new Date(playStartDate || '')
  const currentDate = new Date()
  const isTodayDate = playDate.toDateString() === currentDate.toDateString()

  const playDateFomatted = formattedDate({
    date: playStartDate || '',
    mode: { time: 'full-date' }
  })

  const finishMatchup = async () => {
    setIsPending(true)
    const res = await updatedFinishStats(match)

    if (res.status === 200) {
      setIsPending(false)
      return toast.success('Matchup finished!')
    }

    setIsPending(false)
    return toast.success('An ocurred a error!')
  }

  return (
    <div className='w-full grid grid-cols-2 gap-2'>
      <div className='col-span-2 flex items-center'>
        <Button
          size='sm'
          fullWidth
          className='bg-custom-darkblue text-custom-white text-sm font-bold'
        >
          {status === 'COMPLETED' ? (
            <span className='text-lime-500'>Finished</span>
          ) : isTodayDate ? (
            'Today'
          ) : (
            playDateFomatted
          )}
        </Button>
        <div className='flex'>
          <IconPointFilled className='text-custom-green animate-pulse' />
          <p>Live</p>
        </div>
      </div>
      <Button
        isLoading={isPending}
        onPress={() => finishMatchup()}
        size='sm'
        fullWidth
        className='col-span-2 bg-custom-green w-full rounded-lg cursor-pointer text-sm font-bold'
      >
        Finish matchup
      </Button>
    </div>
  )
}

export default ButtonFinishMatchup
