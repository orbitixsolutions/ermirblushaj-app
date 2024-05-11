import { Avatar, Tooltip } from '@nextui-org/react'
import { Player } from '@prisma/client'

const PlayerAvatar = ({ player }: { player: Player }) => {
  return (
    <Tooltip
      content={
        <p>
          {player.firstName} {player.lastName}
        </p>
      }
    >
      <Avatar isBordered className='w-8 h-8 md:w-12 md:h-12' src={player.profilePhoto!} />
    </Tooltip>
  )
}

export default PlayerAvatar
