'use client'

import { fetcher } from '@/helpers/fetcher'
import { Card, Image } from '@nextui-org/react'
import { Group, Team } from '@prisma/client'
import useSWR from 'swr'

type extendedGroups = Group & {
  teams: Team[]
}

const GroupTeams = () => {
  const interval = { refreshInterval: 3000 }

  const {
    data: getGroups,
    isLoading,
    error
  } = useSWR<extendedGroups[]>('/api/groups', fetcher, interval)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>An ocurred a error!</p>
  }

  return (
    <ol className='grid grid-cols-8 gap-4 py-4'>
      {getGroups?.map((group) => (
        <li
          className='col-span-4 bg-custom-darknavy p-5 rounded-lg'
          key={group.id}
        >
          <h3 className='text-3xl font-bold uppercase text-custom-green mb-4'>
            {group.name}
          </h3>

          <ol className='grid grid-cols-5 gap-4'>
            {group.teams.map((team) => (
              <li key={team.id}>
                <Card className='bg-custom-navy p-4 aspect-square'>
                  <Image src={team.logo || ''} alt={`Team ${team.name}`} />
                </Card>
                <h2 className='text-lg text-center line-clamp-1 mt-2'>
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
