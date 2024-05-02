' use client'

import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, Skeleton } from '@nextui-org/react'
import { Team } from '@prisma/client'
import useSWR from 'swr'
import SkeletonTeams from './skeleton/skeleton-teams'
import ErrorTeams from './errors/error-teams'

const Teams = () => {
  const {
    data: teams,
    isLoading,
    error
  } = useSWR<Team[]>('/api/teams/full', fetcher)

  if (error) return <ErrorTeams message='Error load teams.'/>
  if (isLoading) return <SkeletonTeams />

  return (
    <section className='max-w-[1200px] mx-auto py-8 md:py-24 px-5 text-custom-white space-y-4'>
      <h2 className='w-full text-center font-bold'>Teams</h2>
      <ol className='grid grid-cols-5 rounded-md overflow-hidden border-[1px]'>
        {teams?.map((team, index) => {
          const isLastItem = index === teams.length - 0
          const isSpecialItem = index % 5 === 0 || isLastItem
          const borderClass = isSpecialItem ? '' : 'border-l-[1px]'

          return (
            <li
              key={team.id}
              className={`aspect-square border-custom-lightgray ${borderClass}`}
            >
              <Card
                radius='none'
                className={`bg-transparent size-full grid place-items-center ${
                  index >= teams.length - 20 && index <= teams.length - 16
                    ? 'border-b-[1px]'
                    : 'border-b-[1px] border-t-[1px]'
                }`}
              >
                <Avatar src={team.logo!} alt={`Team: ${team.name}`} />
              </Card>
              <h2 className='text-xs text-center font-light line-clamp-1 py-1.5'>
                {team.name}
              </h2>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default Teams
