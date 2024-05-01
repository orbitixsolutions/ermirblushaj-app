'use client'

import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, CardBody, Image } from '@nextui-org/react'
import { Team } from '@prisma/client'
import SkeletonError from '@/components/dates/skeleton/skeleton-error'
import SkeletonBestTeams from '@/components/dates/skeleton/skeleton-best-teams'
import CrownImage from '@/assets/svg/crown.svg'
import useSWR from 'swr'

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

  const EMPTY_BEST_TEAMS = 0
  if (data_bestteams?.length === EMPTY_BEST_TEAMS) return

  if (error) return <SkeletonError />
  if (isLoading) return <SkeletonBestTeams />

  return (
    <div>
      <h2 className='text-xl md:text-4xl font-bold text-center'>Best Teams</h2>
      <ol className='max-w-[400px] mx-auto flex flex-col gap-4 my-8'>
        {data_bestteams?.map((team, index) => (
          <li key={team.id}>
            <Card
              className={`bg-custom-darkblue border-2 ${
                borderColors[index as keyof typeof borderColors] ||
                'border-gray-600'
              }`}
            >
              <CardBody className='flex flex-row items-center gap-4 w-full text-custom-white px-4'>
                <div>
                  {team.stageStatus === 'WINNER' && (
                    <Image
                      width={24}
                      src={CrownImage.src}
                      className='bg-transparent rounded-sm mb-1'
                      alt='Winner'
                    />
                  )}
                  <h2 className='font-bold text-6xl'>{index + 1}</h2>
                  <h2 className='text-center text-xl'>
                    {index + 1 === 1 ? 'st' : 'nd'}
                  </h2>
                </div>
                <Avatar size='lg' src={team.logo!} />
                <div>
                  <h2 className='font-bold'>{team.name}</h2>
                  <h2 className='text-custom-green'>
                    {team.stageStatus === 'WINNER' ? 'Tournament Winner' : ''}
                  </h2>
                </div>
              </CardBody>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default BestTeams
