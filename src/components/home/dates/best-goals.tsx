import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, Image } from '@nextui-org/react'
import { Player, PlayerStats, TeamStats } from '@prisma/client'
import useSWR from 'swr'

type ExtendedPlayer = Player & {
  team: {
    logo: string
    teamStats: TeamStats
  }
  playerStatus: PlayerStats
}

const BestGoals = () => {
  const {
    data: data_player,
    isLoading,
    error
  } = useSWR<ExtendedPlayer[]>('/api/players/best', fetcher)

  const EMPTY_PLAYERS = 0
  if (data_player?.length === EMPTY_PLAYERS) return

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className='space-y-2'>
      <Card radius='sm' className='bg-custom-blue w-full py-2'>
        <h2 className='text-xs text-center font-bold text-slate-950'>
          Best Goals
        </h2>
      </Card>
      <Card
        radius='sm'
        className='w-[320px] border-[1px] border-custom-lightgray mx-auto bg-transparent'
      >
        <ol className='flex flex-col text-custom-lightgray'>
          {data_player?.map((player, index) => {
            const position = index + 1

            const firstPlace = position === 1
            if (firstPlace)
              return (
                <li
                  key={player.id}
                  className={`grid grid-cols-4 h-16 bg-custom-green border-custom-lightgray text-slate-950 ${
                    index === data_player.length - 1 ? '' : 'border-b-[1px]'
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

                    <div className='col-span-1 grid-cols-3 flex items-center gap-2'>
                      <div>
                        <h2 className='text-sm font-bold'>PJ</h2>
                        <p>{player.number}</p>
                      </div>
                      <div>
                        <h2 className='text-sm font-bold'>G</h2>
                        <p>{player.team.teamStats.matchPlayed}</p>
                      </div>
                      <div>
                        <h2 className='text-sm font-bold'>G</h2>
                        <p>{player.playerStatus.goals}</p>
                      </div>
                    </div>
                  </div>
                </li>
              )

            return (
              <li
                key={player.id}
                className={`grid grid-cols-4 h-16 border-custom-lightgray ${
                  index === data_player.length - 1 ? '' : 'border-b-[1px]'
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
                        {player.playerStatus.goals}
                      </span>
                    </h2>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </Card>
    </div>
  )
}

export default BestGoals
