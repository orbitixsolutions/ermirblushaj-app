'use client'

import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, Image, Tooltip } from '@nextui-org/react'
import { Group, Team } from '@prisma/client'
import SkeletonGroups from '@/components/dashboard/dates/skeleton/skeleton-groups'
import ErrorDates from '@/components/dashboard/dates/errors/error-dates'
import useSWR from 'swr'

type extendedGroups = Group & {
  teams: Team[]
}

const GroupTeams = () => {
  const {
    data: data_groups,
    isLoading,
    error
  } = useSWR<extendedGroups[]>('/api/groups', fetcher)

  const EMPTY_GROUPS = data_groups?.length !== 0

  if (error) return <ErrorDates />
  if (isLoading) return <SkeletonGroups />

  return (
    <div>
      <h2 className='text-2xl xl:text-5xl font-bold mb-5 text-center'>
        Groups
      </h2>

      <ol className='grid grid-cols-3 gap-4 w-full'>
        {EMPTY_GROUPS ? (
          data_groups?.map((group) => (
            <li
              className='col-span-1 bg-custom-darknavy p-5 rounded-lg'
              key={group.id}
            >
              <h3 className='text-xl md:text-3xl font-bold uppercase text-custom-green mb-4'>
                {group.name}
              </h3>

              <ol className='grid grid-cols-4 gap-4'>
                {group.teams.map((team) => (
                  <li key={team.id} className='col-span-1'>
                    <Card className='bg-custom-navy p-2 md:p-4 aspect-square grid place-items-center'>
                      <Avatar
                        radius='sm'
                        className='w-full h-full aspect-square object-cover'
                        src={team.logo!}
                        alt={`Team ${team.name}`}
                      />
                    </Card>
                    <Tooltip
                      className='bg-custom-green text-slate-900 font-bold'
                      content={team.name}
                    >
                      <h2 className='text-sm md:text-lg text-center line-clamp-1 mt-2'>
                        {team.name}
                      </h2>
                    </Tooltip>
                  </li>
                ))}
              </ol>
            </li>
          ))
        ) : (
          <div className='col-span-8'>
            <p className='text-center text-xl md:text-2xl'>
              No there groups available.
            </p>
          </div>
        )}
      </ol>
    </div>
  )
}

export default GroupTeams
