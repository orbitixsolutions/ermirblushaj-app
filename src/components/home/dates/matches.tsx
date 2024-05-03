'use client'

import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'
import { Match, Team } from '@prisma/client'
import NoItems from '@/components/home/errors/no-items'
import ErrorDates from '@/components/home/errors/error-dates'
import Loader from '@/components/home/dates/loader/loader'
import useSWR from 'swr'

type ExtendedMatches = Match & {
  teamA: Team
  teamB: Team
}

const Matches = () => {
  const {
    data: matches,
    isLoading,
    error
  } = useSWR<ExtendedMatches[]>('/api/matches/play', fetcher)

  const EMPTY_MATCHES = 0
  if (matches?.length === EMPTY_MATCHES)
    return <NoItems message='Comming Soon...' />

  if (error) return <ErrorDates message='An ocurred a error.' />
  if (isLoading) return <Loader />

  return (
    <div className='col-span-12 lg:col-span-6 xl:col-span-4'>
      <ol className='grid grid-cols-3 gap-3'>
        {matches?.map((match) => {
          const date = match.playStartDate?.replaceAll('-', '/').split('T')[0]
          return (
            <>
              <li key={match.id} className='col-span-3 grid grid-cols-3 gap-3'>
                <Card className='bg-custom-darkblue aspect-square grid place-items-center text-custom-white'>
                  <CardBody className='space-y-2'>
                    <Avatar
                      src={match.teamA.logo!}
                      className='mx-auto w-8 h-8 xs:w-16 xs:h-16'
                    />
                    <h2 className='text-xs md:text-lg font-bold text-center'>
                      {match.teamA.name}
                    </h2>
                  </CardBody>
                </Card>
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-xs md:text-lg text-custom-green'>{date}</p>
                  <p className='text-center font-bold'>VS</p>
                </div>
                <Card className='bg-custom-darkblue aspect-square grid place-items-center text-custom-white'>
                  <CardBody className='space-y-2'>
                    <Avatar
                      src={match.teamB.logo!}
                      className='mx-auto w-8 h-8 xs:w-16 xs:h-16'
                    />
                    <h2 className='text-xs md:text-lg font-bold text-center'>
                      {match.teamA.name}
                    </h2>
                  </CardBody>
                </Card>
              </li>
              <Divider
                orientation='horizontal'
                className='bg-custom-lightgray my-2 col-span-3'
              />
            </>
          )
        })}
      </ol>
    </div>
  )
}

export default Matches
