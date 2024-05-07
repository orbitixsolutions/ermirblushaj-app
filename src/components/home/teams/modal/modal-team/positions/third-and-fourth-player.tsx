import { Player } from '@prisma/client'
import PlayerAvatar from '@/components/home/teams/modal/modal-team/player-avatar'

const ThirAndForthPlayer = ({ player }: { player: Player[] }) => {
  return (
    <div className='absolute left-[50%] bottom-[20%] -translate-x-[50%] -translate-y-[50%] w-full flex justify-around'>
      {player.map((player) => {
        if (player.position === 'attacker' && (player as any).order === 3)
          return <PlayerAvatar key={player.id} player={player} />
      })}
      {player.map((player) => {
        if (player.position === 'attacker' && (player as any).order === 4)
          return <PlayerAvatar key={player.id} player={player} />
      })}
    </div>
  )
}

export default ThirAndForthPlayer
