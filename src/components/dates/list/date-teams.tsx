'use client'

import { Divider } from '@nextui-org/react'
import { fetcher } from '@/helpers/fetcher'
import { Match, Team } from '@prisma/client'
import CardMatchup from '@/components/dates/cards/card-matchup'
import DateOwnerOptions from '@/components/dates/options/date-owner-options'
import DateGeneralOptions from '@/components/dates/options/date-general-options'
import SkeletonDates from '@/components/dates/skeleton/skeleton-dates'
import SkeletonError from '@/components/dates/skeleton/skeleton-error'
import useSWR from 'swr'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const DateTeams = () => {
  const {
    data: data_matches,
    isLoading,
    error
  } = useSWR<ExtendedMatch[]>('/api/matches', fetcher)

  const EMPTY_MATCHES = data_matches?.length === 0
  if (EMPTY_MATCHES) return

  if (error) return <SkeletonError />
  if (isLoading) return <SkeletonDates />

  return (
    <div className='grid grid-cols-8 space-y-20 xl:space-y-0'>
      <div className='col-span-8 xl:col-span-2'>
        <h2 className='text-2xl xl:text-5xl font-bold mb-5 text-center'>
          Dates
        </h2>

        <ol>
          {data_matches?.map((matchup) => (
            <>
              <li
                key={matchup.id}
                className='rounded-lg flex flex-col items-start gap-4 py-4'
              >
                <CardMatchup match={matchup} />
              </li>
              <Divider className='bg-custom-lightgray' />
            </>
          ))}
        </ol>
      </div>

      <div className='col-span-8 xl:col-span-6 flex-col xl:flex-row flex gap-4 justify-end space-y-8 xl:space-y-0'>
        <DateGeneralOptions />
        <DateOwnerOptions />
      </div>
    </div>
  )
}

export default DateTeams
