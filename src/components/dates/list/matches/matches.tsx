'use client'

import { fetcher } from '@/helpers/fetcher'
import { Match, MatchKey, Team } from '@prisma/client'
import { Divider } from '@nextui-org/react'
import useSWR from 'swr'
import CardMatchup from '@/components/dates/cards/card-matchup'
import DateGeneralOptions from '@/components/dates/options/date-general-options'
import DateOwnerOptions from '../../options/date-owner-options'
import ButtonDeleteKeyMatches from '../../buttons/options/delete/button-delete-key-matches'
import ButtonOptionsKeys from '../../buttons/options/button-options-keys'
import BestTeams from '../best-teams'
import MatchesEighths from './matches-eighths'
import MatchesQuarters from './matches-quarters'
import MatchesSemifinals from './matches-semifinals'
import MatchesFinal from './matches-final'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const Matches = () => {
  const {
    data: data_matches,
    isLoading,
    error
  } = useSWR<ExtendedMatch[]>('/api/matches', fetcher)

  const { data: key_matches } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys',
    fetcher
  )

  if (error) {
    return <p>An ocurred a error!</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className='space-y-20'>
      {key_matches?.length !== 0 && (
        <div className='w-[968px] mx-auto'>
          <h2 className='text-5xl font-bold mb-5 text-center'>Keys</h2>

          <div className='flex justify-between mx-auto relative'>
            {/* Column A */}
            <MatchesEighths column='a' phase='eighth' />
            <MatchesQuarters column='a' phase='quarter' />
            <MatchesSemifinals column='a' phase='semifinals' />

            {/* Column B */}
            <MatchesEighths column='b' phase='eighth' />
            <MatchesQuarters column='b' phase='quarter' />
            <MatchesSemifinals column='b' phase='semifinals' />

            {/* Final */}
            <MatchesFinal column='none' phase='final' />
          </div>

          <div className='flex flex-col gap-4 py-5 justify-center'>
            <ButtonDeleteKeyMatches />
            <ButtonOptionsKeys />
          </div>
        </div>
      )}

      <BestTeams />

      <div className='flex justify-between'>
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
    </div>
  )
}
export default Matches
