'use client'

import { fetcher } from '@/helpers/fetcher'
import { Match, Team } from '@prisma/client'
import { Divider } from '@nextui-org/react'
import useSWR from 'swr'
import CardMatchup from '@/components/dates/cards/card-matchup'
import DateGeneralOptions from '@/components/dates/options/date-general-options'
import DateOwnerOptions from '../options/date-owner-options'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const Matches = () => {
  const {
    data: getMatches,
    isLoading,
    error
  } = useSWR<ExtendedMatch[]>('/api/matches', fetcher, {
    refreshInterval: 3000
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>An ocurred a error!</p>
  }

  return (
    <div className='flex justify-around relative'>
      <div className='w-[480px]'>
        <h2 className='text-5xl font-bold mb-5 text-center'>Dates</h2>
        <ol className='w-full'>
          {getMatches?.map((matchup) => (
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
        <div className='sticky grid grid-cols-2 gap-5 top-[20px]'>
          <DateGeneralOptions />
          <DateOwnerOptions />
        </div>
      </div>
    </div>
  )
}
export default Matches
