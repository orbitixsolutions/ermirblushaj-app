'use client'

import { fetcher } from '@/helpers/fetcher'
import { Card } from '@nextui-org/react'
import { Player, PlayerStats, TeamStats } from '@prisma/client'
import ItemFirstPlayer from '@/components/home/dates/item/item-first-player'
import ItemPlayer from '@/components/home/dates/item/item-player'
import NoItems from '@/components/home/errors/no-items'
import ErrorDates from '@/components/home/errors/error-dates'
import Loader from '@/components/home/dates/loader/loader'
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
  if (data_player?.length === EMPTY_PLAYERS)
    return <NoItems message='No scorers to show' />

  if (error) return <ErrorDates message='An ocurred a error.' />
  if (isLoading) return <Loader />

  return (
    <div className='col-span-12 lg:col-span-6 xl:col-span-4 space-y-2'>
      <Card radius='sm' className='bg-custom-blue py-2'>
        <h2 className='text-lg text-center font-bold text-custom-white'>
          Best Goals
        </h2>
      </Card>
      <Card
        radius='sm'
        className='border-[1px] border-custom-lightgray mx-auto bg-transparent'
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
