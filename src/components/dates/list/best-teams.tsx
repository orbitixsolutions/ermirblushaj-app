'use client'

import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'
import { Team } from '@prisma/client'
import useSWR from 'swr'
import Loader from '../loader'
import SkeletonError from '../skeleton/skeleton-error'

const borderColors = {
  0: 'border-yellow-400',
  1: 'border-gray-400',
  2: 'border-orange-600'
}

const BestTeams = () => {
  const {
    data: data_bestteams,
    isLoading,
    error
  } = useSWR<Team[]>('/api/matches/keys/top', fetcher)

  if (error) return <SkeletonError />
  if (isLoading) return <Loader />

  const EMPTY_BEST_TEAMS = 0
  if (data_bestteams?.length === EMPTY_BEST_TEAMS) return

  return (
    <div>
      <h2 className='text-3xl font-bold text-center'>Best Teams</h2>
      <ol className='w-full flex justify-center gap-4 my-8'>
        {data_bestteams?.map((team, index) => (
          <li key={team.id} className='flex'>
            <Card
              className={`bg-custom-darkblue border-2 ${
                borderColors[index as keyof typeof borderColors] ||
                'border-gray-600'
              }`}
            >
              <CardBody>
                <Avatar size='lg' src={team.logo!} />
              </CardBody>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default BestTeams
