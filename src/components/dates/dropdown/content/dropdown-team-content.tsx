import { Avatar } from '@nextui-org/react'
import { Player } from '@prisma/client'
import { toast } from 'sonner'
import { updatedStats } from '@/actions/services/edit'

const DropdownTeamContent = ({ player }: { player: Player }) => {
  const addGoalPlayer = async () => {
    const res = await updatedStats(player)
  
    if (res.status === 200) {
      return toast.success(
        `Goal added for player: ${player.firstName} ${player.lastName}`
      )
    }

    return toast.error('An ocurred a error!')
  }

  return (
    <div onClick={addGoalPlayer} className='flex items-center gap-2 size-full'>
      <Avatar
        size='sm'
        src={player.profilePhoto || ''}
        name={player.firstName}
      />
      <div>
        <h2 className='text-base capitalize'>
          {player.firstName} {player.lastName}
        </h2>
      </div>
    </div>
  )
}

export default DropdownTeamContent
