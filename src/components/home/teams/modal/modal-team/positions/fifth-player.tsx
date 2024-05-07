import { Player } from '@prisma/client'
import PlayerAvatar from '@/components/home/teams/modal/modal-team/player-avatar'

const FifthPlayer = ({ player }: { player: Player[] }) => {
  return (
    <>
      {player.map((player) => {
        if (player.position === 'goalkeeper')
          return (
            <div
              className='absolute bottom-5 left-[50%] -translate-x-[50%]'
              key={player.id}
            >
              <PlayerAvatar player={player} />
            </div>
          )
      })}
    </>
  )
}

export default FifthPlayer
