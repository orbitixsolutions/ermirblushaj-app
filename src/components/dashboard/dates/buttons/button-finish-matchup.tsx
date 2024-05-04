import { updatedFinishStats } from '@/actions/services/edit'
import { Match, Team } from '@prisma/client'
import { Button } from '@nextui-org/react'
import { IconPointFilled } from '@tabler/icons-react'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { mutate } from 'swr'
import { isCurrentDate } from '@/helpers/is-today'
import useMatches from '@/hooks/matches-hooks/use-matches'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const ButtonFinishMatchup = ({ match }: { match: ExtendedMatch }) => {
  const [isPending, starTransition] = useTransition()
  const { id, playStartDate, status } = match

  const isCompleted = status === 'COMPLETED'
  const { updatedId } = useMatches()

  const handleClickDate = () => {
    if (isCompleted) return

    updatedId(id)
  }

  const finishMatchup = () => {
    starTransition(async () => {
      const { status, success } = await updatedFinishStats(match)

      if (status === 200) {
        mutate('/api/matches')
        toast.success(success)
        return
      }
      toast.success('An ocurred a error!')
      return
    })
  }

  if (!isCurrentDate(playStartDate!))
    return (
      <div className='w-full flex items-center'>
        <Button
          fullWidth
          onPress={() => handleClickDate()}
          className='bg-custom-darkblue text-custom-white text-sm font-bold'
        >
          {playStartDate?.replaceAll('-', '/')}
        </Button>
        <div className='flex'>
          <IconPointFilled className='text-custom-green animate-pulse' />
          <p>Live</p>
        </div>
      </div>
    )

  return (
    <div className='w-full grid grid-cols-2 gap-2'>
      <div className='col-span-2 flex items-center'>
        <Button
          fullWidth
          onPress={() => handleClickDate()}
          className='bg-custom-darkblue text-custom-white text-sm font-bold'
        >
          {playStartDate?.replaceAll('-', '/')}
        </Button>
        <div className='flex'>
          <IconPointFilled className='text-custom-green animate-pulse' />
          <p>Live</p>
        </div>
      </div>
      <Button
        fullWidth
        isLoading={isPending}
        onPress={() => finishMatchup()}
        className='col-span-2 bg-custom-green w-full rounded-lg cursor-pointer text-sm font-bold'
      >
        Finish match
      </Button>
    </div>
  )
}

export default ButtonFinishMatchup
