'use client'

import { fetcher } from '@/helpers/fetcher'
import { MatchKey, Team } from '@prisma/client'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import MatchesEighths from '@/components/dashboard/dates/list/matches/matches-eighths'
import MatchesQuarters from '@/components/dashboard/dates/list/matches/matches-quarters'
import MatchesSemifinals from '@/components/dashboard/dates/list/matches/matches-semifinals'
import MatchesFinal from '@/components/dashboard/dates/list/matches/matches-final'
import ButtonDeleteKeyMatches from '@/components/dashboard/dates/buttons/delete/button-delete-key-matches'
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

  const EMPTY_KEY_MATCHES = key_matches?.length === 0
  if (EMPTY_KEY_MATCHES) return

  if (error) return <ErrorDates />
  if (isLoading) return <Loader />

  return (
    <Card className='bg-custom-darknavy text-custom-white rounded-none sm:rounded-xl sm:border-[1px] border-custom-tgray'>
      <CardHeader className='bg-custom-green py-4 rounded-none sm:rounded-xl'>
        <h2 className='text-2xl xl:text-5xl mx-auto font-bold text-center'>
          Keys Tournament
        </h2>
      </CardHeader>

      <CardBody>
        <div className='w-full flex items-center justify-between'>
          <MatchesEighths column='a' phase='EIGHTH' />

          <div className='flex justify-between items-center size-full max-w-[750px] px-3 relative'>
            <MatchesQuarters column='a' phase='QUARTER' />

            <div className='flex justify-between items-center size-full max-w-[500px] px-2 xs:px-4'>
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
      </CardBody>

      <CardFooter className='grid gap-3'>
        <ButtonOptionsKeys />
        <ButtonDeleteKeyMatches />
      </CardFooter>
    </Card>
  )
}

export default MatchesKeys
