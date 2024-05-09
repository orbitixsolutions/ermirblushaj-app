'use client'

import { Divider } from '@nextui-org/react'
import { fetcher } from '@/helpers/fetcher'
import { Match, Team, TeamStats } from '@prisma/client'
import CardMatchup from '@/components/dashboard/dates/cards/card-matchup'
import DateOwnerOptions from '@/components/dashboard/dates/options/date-owner-options'
import DateGeneralOptions from '@/components/dashboard/dates/options/date-general-options'
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
    <div className='flex justify-center md:justify-between gap-8 flex-wrap space-y-20 xl:space-y-0'>
      <div className='flex-1'>
        <h2 className='text-2xl xl:text-5xl font-bold mb-5 text-center'>
          Dates
        </h2>

        <ol className='w-full px-12 sm:px-2'>
          {EMPTY_DATES ? (
            data_matches?.map((matchup) => (
              <>
                <li
                  key={matchup.id}
                  className='rounded-lg flex flex-col items-start gap-4 py-4'
                >
                  <CardMatchup match={matchup} />
                </li>
                <Divider className='bg-custom-lightgray' />
              </>
            ))
          ) : (
            <div>
              <p className='text-center text-xl md:text-2xl'>
                No there dates available.
              </p>
            </div>
          )}
        </ol>
      </div>

      <div className='flex justify-center flex-wrap gap-4'>
        <DateGeneralOptions />
        <DateOwnerOptions />
      </div>
    </div>
  )
}

export default DateTeams
