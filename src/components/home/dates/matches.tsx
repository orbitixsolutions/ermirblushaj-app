'use client'

import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, Divider } from '@nextui-org/react'
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

  if (error) return <div>Failed to load</div>
  if (isLoading) return <SkeletonMatches />

  return (
    <div className='w-[320px] mx-auto'>
      <h2 className='text-center font-bold'>Matches</h2>

      <ol className='grid-cols-3 py-5'>
        {matches?.map((match, index) => {
          const date = match.playStartDate?.replaceAll('-', '/').split('T')[0]
          const firstItem = index === 0

          if (firstItem)
            return (
              <>
                <li
                  key={match.id}
                  className='col-span-3 flex items-center justify-around'
                >
                  <Card className='bg-custom-darkblue p-2'>
                    <Avatar src={match.teamA.logo!} size='lg' />
                  </Card>
                  <div>
                    <p className='text-sm text-custom-green'>{date}</p>
                    <p className='text-center font-bold'>VS</p>
                  </div>
                  <Card className='bg-custom-darkblue p-2'>
                    <Avatar src={match.teamB.logo!} size='lg' />
                  </Card>
                </li>
                <Divider
                  orientation='horizontal'
                  className=' bg-custom-lightgray my-4 px-4'
                />
              </>
            )

          return (
            <li
              key={match.id}
              className='col-span-3 flex items-center justify-around'
            >
              <Card className='bg-custom-darkblue p-2'>
                <Avatar src={match.teamA.logo!} size='sm' />
              </Card>
              <div>
                <p className='text-sm text-custom-green'>{date}</p>
                <p className='text-center font-bold'>VS</p>
              </div>
              <Card className='bg-custom-darkblue p-2'>
                <Avatar src={match.teamB.logo!} size='sm' />
              </Card>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Matches
