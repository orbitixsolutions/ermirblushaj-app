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

  if (error) {
    return <SkeletonError />
  }

  if (isLoading) {
    return <SkeletonDates />
  }

  return (
    <div className='flex flex-wrap-reverse  justify-between'>
      <div className='w-[400px]'>
        <h2 className='text-5xl font-bold mb-5 text-center'>Dates</h2>

        <ol className='w-full'>
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

      <div className='flex flex-col gap-5 pt-20'>
        <div className='grid grid-cols-2 gap-5 top-[20px]'>
          <DateGeneralOptions />
          <DateOwnerOptions />
        </div>
      </div>
    </div>
  )
}

export default DateTeams
