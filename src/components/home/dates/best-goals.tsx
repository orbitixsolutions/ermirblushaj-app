import { fetcher } from '@/helpers/fetcher'
import { Card } from '@nextui-org/react'
import { Player, PlayerStats, TeamStats } from '@prisma/client'
import ItemFirstPlayer from './item/item-first-player'
import ItemPlayer from './item/item-player'
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
        <h2 className='text-lg text-center font-bold text-custom-white'>
          Best Goals
        </h2>
      </Card>
      <Card
        radius='sm'
        className='max-w-[320px] border-[1px] border-custom-lightgray mx-auto bg-transparent'
      >
        <ol className='flex flex-col text-custom-lightgray'>
          {data_player?.map((player, index) => {
            const position = index + 1
            const firstPlace = position === 1

            if (firstPlace)
              return (
                <ItemFirstPlayer
                  key={player.id}
                  data={data_player}
                  index={index}
                  player={player}
                />
              )

            return (
              <ItemPlayer
                key={player.id}
                data={data_player}
                index={index}
                player={player}
              />
            )
          })}
        </ol>
      </Card>
    </div>
  )
}

export default BestGoals
