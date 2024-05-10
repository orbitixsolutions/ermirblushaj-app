'use client'

import { Divider } from '@nextui-org/react'
import { fetcher } from '@/helpers/fetcher'
import { Match, Team, TeamStats } from '@prisma/client'
import CardMatchup from '@/components/dashboard/dates/cards/card-matchup'
import SkeletonDates from '@/components/dashboard/dates/skeleton/skeleton-dates'
import ErrorDates from '@/components/dashboard/dates/errors/error-dates'
import useSWR from 'swr'

type ExtendedMatch = Match & {
  teamA: Team & { teamStats: TeamStats }
  teamB: Team & { teamStats: TeamStats }
}

const DateTeams = () => {
  const {
    data: data_matches,
    isLoading,
    error
  } = useSWR<ExtendedMatch[]>('/api/matches', fetcher)

  if (error) return <ErrorDates />
  if (isLoading) return <SkeletonDates />

  const EMPTY_DATES = data_matches?.length !== 0

  return (
    <div>
      <h2 className='text-2xl xl:text-5xl font-bold text-center mb-5'>
        Date Matches
      </h2>

      <ol className='w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8'>
        {EMPTY_DATES ? (
          data_matches?.map((matchup) => (
            <>
              <li
                key={matchup.id}
                className='col-span-4 md:col-span-2 rounded-lg flex flex-col items-start gap-4'
              >
                <CardMatchup match={matchup} />

                <Divider className='bg-custom-lightgray' />
              </li>
            </>
          ))
        ) : (
          <div className='col-span-4 md:col-span-2'>
            <p className='text-center text-xl md:text-2xl'>
              No there dates available.
            </p>
          </div>
        )}
      </ol>
    </div>
  )
}

export default DateTeams
