import { Divider } from '@nextui-org/react'
import { Player } from '@prisma/client'
import PlayerAvatar from '@/components/home/teams/modal/modal-team/player-avatar'

const SecondPlayer = ({ player }: { player: Player[] }) => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] w-full bg-custom-lightgray h-[2px]'>
      <Divider orientation='horizontal' />
      <div className='absolute left-[50%] top-[20%] -translate-x-[50%] -translate-y-[50%] w-[122px] h-[122px] border-2 border-custom-lightgray grid place-items-center rounded-full'>
        {player.map((player) => {
          if (player.position === 'attacker' && (player as any).order === 2)
            return <PlayerAvatar key={player.id} player={player} />
        })}
      </div>
    </div>
  )
}

export default SecondPlayer
