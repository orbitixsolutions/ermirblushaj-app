'use client'

import { fetcher } from '@/helpers/fetcher'
import { Card, Image } from '@nextui-org/react'
import { Group, Team } from '@prisma/client'
import SkeletonGroups from '@/components/dates/skeleton/skeleton-groups'
import SkeletonError from '@/components/dates/skeleton/skeleton-error'
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

  const EMPTY_GROUPS = 0
  if (data_groups?.length === EMPTY_GROUPS) return

  if (error) return <SkeletonError />
  if (isLoading) return <SkeletonGroups />

  return (
    <ol className='grid grid-cols-8 gap-4'>
      {data_groups?.map((group) => (
        <li
          className='col-span-8 lg:col-span-4 bg-custom-darknavy p-5 rounded-lg'
          key={group.id}
        >
          <h3 className='text-xl md:text-3xl font-bold uppercase text-custom-green mb-4'>
            {group.name}
          </h3>

          <ol className='grid grid-cols-6 md:grid-cols-5 gap-4'>
            {group.teams.map((team) => (
              <li
                key={team.id}
                className='col-span-3 xs:col-span-2 md:col-span-1'
              >
                <Card className='bg-custom-navy p-2 md:p-4 aspect-square'>
                  <Image src={team.logo!} alt={`Team ${team.name}`} />
                </Card>
                <h2 className='text-sm md:text-lg text-center line-clamp-1 mt-2'>
                  {team.name}
                </h2>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}

export default GroupTeams
