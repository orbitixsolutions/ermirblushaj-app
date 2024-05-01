'use client'

import { fetcher } from '@/helpers/fetcher'
import { MatchKey, Team } from '@prisma/client'
import MatchesEighths from '@/components/dates/list/matches/matches-eighths'
import MatchesQuarters from '@/components/dates/list/matches/matches-quarters'
import MatchesSemifinals from '@/components/dates/list/matches/matches-semifinals'
import MatchesFinal from '@/components/dates/list/matches/matches-final'
import ButtonDeleteKeyMatches from '@/components/dates/buttons/options/delete/button-delete-key-matches'
import ButtonOptionsKeys from '@/components/dates/buttons/options/button-options-keys'
import SkeletonError from '@/components/dates/skeleton/skeleton-error'
import Loader from '@/components/dates/loader'
import useSWR from 'swr'

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

  const EMPTY_KEY_MATCHES = 0
  if (EMPTY_KEY_MATCHES) return

  if (error) return <SkeletonError />
  if (isLoading) return <Loader />

  return (
    <>
      {key_matches?.length !== 0 && (
        <div className='hidden md:block lg:max-w-[720px] xl:w-[968px] mx-auto'>
          <h2 className='text-2xl xl:text-5xl font-bold text-center'>Keys</h2>

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

          <div className='max-w-[400px] mx-auto grid gap-3'>
            <ButtonOptionsKeys />
            <ButtonDeleteKeyMatches />
          </div>
        </div>
      )}
    </>
  )
}

export default MatchesKeys
