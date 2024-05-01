import { Avatar } from '@nextui-org/react'
import { Player } from '@prisma/client'

const DropdownTeamContent = ({ player }: { player: Player }) => {
  return (
    <div className='flex items-center gap-2 size-full'>
      <Avatar
        size='sm'
        src={player.profilePhoto!}
        name={player.firstName}
      />
      <h2 className='text-base capitalize'>
        {player.firstName} {player.lastName}
      </h2>
    </div>
  )
}

export default DropdownTeamContent
