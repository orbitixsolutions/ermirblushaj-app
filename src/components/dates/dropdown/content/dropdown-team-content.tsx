import { Avatar } from '@nextui-org/react'
import { Player } from '@prisma/client'
import { toast } from 'sonner'
import axios from 'axios'

const DropdownTeamContent = ({ player }: { player: Player }) => {
  const addGoalPlayer = async () => {
    const playerId = player.id
    const teamId = player.teamId

    const res = await axios.put('/api/groups', {
      playerId: playerId,
      teamId: teamId
    })
    if (res.status === 200) {
      return toast.success(
        `Goal add for player ${player.firstName} ${player.lastName}`
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
      <h2 className='text-sm capitalize'>
        {player.firstName} {player.lastName}
      </h2>
    </div>
  )
}

export default DropdownTeamContent
