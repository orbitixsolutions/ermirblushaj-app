'use client'

import { fetcher } from '@/helpers/fetcher'
import { Player, PlayerStats, Team, TeamStats } from '@prisma/client'
import useSWR from 'swr'

type ExtendedTeams = Team & {
  teamStats: TeamStats
  playerStats: PlayerStats[]
  players: Player[]
}

const InfoPage = () => {
  const {
    data: getTeams,
    isLoading,
    error
  } = useSWR<ExtendedTeams[]>('/api/teams/full', fetcher, {
    refreshInterval: 1000
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>An ocurred a error!</p>
  }

  return (
    <section className='container mx-auto py-20'>
      <ol className='w-full grid grid-cols-4'>
        {getTeams?.map((team) => (
          <li key={team.id} className='col-span-2'>
            <h2 className='text-xl font-bold underline'>{team.name}</h2>
            Team Goals:{' '}
            <span
              className={`${
                team.teamStats.goalsFor && team.teamStats.goalsFor > 0
                  ? 'text-lime-500 font-bold'
                  : ''
              }`}
            >
              {team.teamStats.goalsFor}
            </span>
            <ol className='grid grid-cols-6 my-4'>
              {team.playerStats.map((stats) => (
                <li key={stats.playerId}>
                  <h2>
                    {stats.firstName} {stats.lastName}
                  </h2>
                  <p className='font-semibold underline'>
                    Goals:{' '}
                    <span
                      className={`${
                        stats.goals && stats.goals > 0
                          ? 'text-lime-500 font-bold'
                          : ''
                      }`}
                    >
                      {stats.goals}
                    </span>
                  </p>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default InfoPage
