import { Avatar } from '@nextui-org/react'
import { Player, PlayerStats, TeamStats } from '@prisma/client'

type ExtendedPlayer = Player & {
  team: {
    logo: string
    teamStats: TeamStats
  }
  playerStatus: PlayerStats
}

const ItemPlayer = ({
  data,
  player,
  index
}: {
  data: ExtendedPlayer[]
  player: ExtendedPlayer
  index: number
}) => {
  const position = index + 1

  const formatNumber = (number: string | number) => {
    const stringNumber = Number(number)
    return stringNumber >= 10 ? stringNumber : `0${stringNumber}`
  }

  return (
    <li
      key={player.id}
      className={`grid grid-cols-4 h-16 border-custom-lightgray ${
        index === data.length - 1 ? '' : 'border-b-[1px]'
      }`}
    >
      <span className='col-span-1 font-bold text-lg size-full grid place-items-center border-r-[1px]'>
        {position}
      </span>
      <div className='col-span-3 size-full grid grid-cols-4 px-4'>
        <div className='relative col-span-1 flex items-center'>
          <Avatar
            src={player.profilePhoto!}
            alt={`${player.firstName} ${player.lastName}`}
          />
          <div className='absolute top-2 left-10'>
            <Avatar
              src={player.team.logo!}
              className='w-5 h-5 text-tiny'
              alt={`${player.firstName} ${player.lastName}`}
            />
          </div>
        </div>

        <div className='col-span-2 flex items-center'>
          <h2 className='ml-4 text-sm font-bold capitalize line-clamp-1'>
            {player.firstName} {player.lastName}
          </h2>
        </div>

        <div className='col-span-1 flex items-center'>
          <h2 className='text-sm font-bold'>
            G{' '}
            <span className='text-lg'>
              {formatNumber(player.playerStatus.goals!)}
            </span>
          </h2>
        </div>
      </div>
    </li>
  )
}

export default ItemPlayer
