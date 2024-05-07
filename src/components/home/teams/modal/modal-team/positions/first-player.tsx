import { Player } from '@prisma/client'
import PlayerAvatar from '@/components/home/teams/modal/modal-team/player-avatar'

const FirstPlayer = ({ player }: { player: Player[] }) => {
  return (
    <div className='absolute left-[50%] top-[20%] -translate-x-[50%] -translate-y-[50%]'>
      {player.map((player) => {
        if (player.position === 'attacker' && (player as any).order === 1)
          return <PlayerAvatar key={player.id} player={player} />
      })}
    </div>
  )
}

export default FirstPlayer
