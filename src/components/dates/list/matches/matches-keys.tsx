'use client'

import { fetcher } from '@/helpers/fetcher'
import { MatchKey, Team } from '@prisma/client'
import MatchesEighths from '@/components/dates/list/matches/matches-eighths'
import MatchesQuarters from '@/components/dates/list/matches/matches-quarters'
import MatchesSemifinals from '@/components/dates/list/matches/matches-semifinals'
import MatchesFinal from '@/components/dates/list/matches/matches-final'
import ButtonDeleteKeyMatches from '@/components/dates/buttons/options/delete/button-delete-key-matches'
import ButtonOptionsKeys from '@/components/dates/buttons/options/button-options-keys'
import Loader from '@/components/dates/loader'
import useSWR from 'swr'
import SkeletonError from '../../skeleton/skeleton-error'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const MatchesKeys = () => {
  const {
    data: key_matches,
    isLoading,
    error
  } = useSWR<ExtendedMatchKey[]>('/api/matches/keys', fetcher)

  if (error) {
    return <SkeletonError />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
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
    </>
  )
}

export default MatchesKeys
