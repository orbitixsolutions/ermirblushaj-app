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
      <Avatar isBordered size='lg' src={player.profilePhoto!} />
    </Tooltip>
  )
}

export default PlayerAvatar
