import { Player, PlayerStats, TeamStats } from '@prisma/client'
import { Card } from '@nextui-org/react'
import ItemFirstPlayer from '@/components/home/dates/item/item-first-player'
import ItemPlayer from '@/components/home/dates/item/item-player'
import prisma from '@/libs/prisma'
import ErrorDates from '@/components/home/errors/error-dates'

type ExtendedPlayer = Player & {
  team: {
    logo: string
    teamStats: TeamStats
  }
  playerStatus: PlayerStats
}

const getBestGoals = async () => {
  try {
    const players = await prisma.player.findMany({
      orderBy: [
        {
          playerStatus: {
            goals: 'desc'
          }
        }
      ],
      include: {
        playerStatus: true,
        team: {
          select: {
            logo: true,
            teamStats: true
          }
        }
      }
    })

    return {
      data: players as ExtendedPlayer[],
      status: 200,
      message: 'Success'
    }
  } catch (error: any) {
    return { data: null, status: 500, message: error.message }
  }
}

const BestGoals = async () => {
  const { data: players, status } = await getBestGoals()

  if (status === 500) {
    return <ErrorDates message='Error loading data.' />
  }

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
          {players?.slice(0, 10).map((player, index) => {
            const position = index + 1
            const firstPlace = position === 1

            if (firstPlace)
              return (
                <ItemFirstPlayer
                  key={player.id}
                  data={players}
                  index={index}
                  player={player}
                />
              )

            return (
              <ItemPlayer
                key={player.id}
                data={players}
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
