'use client'

import { fetcher } from '@/helpers/fetcher'
import { MatchKey, Team } from '@prisma/client'
import MatchesEighths from '@/components/dashboard/dates/list/matches/matches-eighths'
import MatchesQuarters from '@/components/dashboard/dates/list/matches/matches-quarters'
import MatchesSemifinals from '@/components/dashboard/dates/list/matches/matches-semifinals'
import MatchesFinal from '@/components/dashboard/dates/list/matches/matches-final'
import ButtonDeleteKeyMatches from '@/components/dashboard/dates/buttons/options/delete/button-delete-key-matches'
import ButtonOptionsKeys from '@/components/dashboard/dates/buttons/options/button-options-keys'
import ErrorDates from '@/components/dashboard/dates/errors/error-dates'
import Loader from '@/components/dashboard/dates/loader'
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

  if (error) return <ErrorDates />
  if (isLoading) return <Loader />

  return (
    <>
      {key_matches?.length !== 0 && (
        <div className='hidden md:block md:max-w-[640px] lg:max-w-[720px] xl:w-[968px] mx-auto space-y-2'>
          <h2 className='text-2xl xl:text-5xl font-bold text-center'>Keys</h2>

          <div className='w-full flex items-center justify-between'>
            <MatchesEighths column='a' phase='EIGHTH' />

            <div className='flex justify-between items-center size-full max-w-[500px] px-3 relative'>
              <MatchesQuarters column='a' phase='QUARTER' />

              <div className='flex justify-between items-center size-full max-w-[300px] px-2 xs:px-4'>
                <MatchesSemifinals column='a' phase='SEMIFINALS' />

                <div className='flex justify-center size-full max-w-[150px] px-2 xs:px-4'>
                  <MatchesFinal column='none' phase='FINAL' />
                </div>

                <MatchesSemifinals column='b' phase='SEMIFINALS' />
              </div>

              <MatchesQuarters column='b' phase='QUARTER' />
            </div>

            <MatchesEighths column='b' phase='EIGHTH' />
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
