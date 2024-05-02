'use client'

import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'
import { Match, Team } from '@prisma/client'
import useSWR from 'swr'
import SkeletonMatches from '../skeleton/skeleton-matches'

type ExtendedMatches = Match & {
  teamA: Team
  teamB: Team
}

const Matches = () => {
  const {
    data: matches,
    isLoading,
    error
  } = useSWR<ExtendedMatches[]>('/api/matches/play-now', fetcher)

  const EMPTY_MATCHES = 0
  if (matches?.length === EMPTY_MATCHES) return

  if (error) return <div>Failed to load</div>
  if (isLoading) return <SkeletonMatches />

  return (
    <div className='max-w-[320px] mx-auto'>
      <h2 className='text-center font-bold'>Matches</h2>
      <ol className='grid grid-cols-3 py-5 gap-3'>
        {matches?.map((match) => {
          const date = match.playStartDate?.replaceAll('-', '/').split('T')[0]

          return (
            <li key={match.id} className='col-span-3 grid grid-cols-3 gap-3'>
              <Card className='bg-custom-darkblue aspect-square text-custom-white'>
                <CardBody className='space-y-2'>
                  <Avatar src={match.teamA.logo!} className='mx-auto' />
                  <h2 className='text-xs text-center'>{match.teamA.name}</h2>
                </CardBody>
              </Card>
              <div className='flex flex-col items-center justify-center'>
                <p className='text-xs text-custom-green'>{date}</p>
                <p className='text-center font-bold'>VS</p>
              </div>
              <Card className='bg-custom-darkblue aspect-square text-custom-white'>
                <CardBody className='space-y-2'>
                  <Avatar src={match.teamB.logo!} className='mx-auto' />
                  <h2 className='text-xs text-center'>{match.teamA.name}</h2>
                </CardBody>
              </Card>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Matches
