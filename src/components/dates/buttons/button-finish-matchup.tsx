import { updatedFinishStats } from '@/actions/services/edit'
import { Button } from '@nextui-org/react'
import { Match, Team } from '@prisma/client'
import { IconPointFilled } from '@tabler/icons-react'
import { toast } from 'sonner'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const ButtonFinishMatchup = ({ match }: { match: ExtendedMatch }) => {
  const finishMatchup = async () => {
    const res = await updatedFinishStats(match)

    if (res.status === 200) {
      return toast.success('Matchup finished!')
    }

    return toast.success('An ocurred a error!')
  }

  return (
    <div className='w-full grid grid-cols-2 gap-2'>
      <div className='col-span-2 flex items-center'>
        <Button
          size='sm'
          fullWidth
          className='bg-custom-darkblue font-bold text-custom-white'
        >
          Today
        </Button>
        <div className='flex'>
          <IconPointFilled className='text-custom-green animate-pulse' />
          <p>Live</p>
        </div>
      </div>
      <Button
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
