'use client'

import { fetcher } from '@/helpers/fetcher'
import { Match, MatchKey, Team } from '@prisma/client'
import { Divider } from '@nextui-org/react'
import useSWR from 'swr'
import CardMatchup from '@/components/dates/cards/card-matchup'
import DateGeneralOptions from '@/components/dates/options/date-general-options'
import DateOwnerOptions from '../options/date-owner-options'
import PopoverDateTeam from '../popover/popover-date-team'
import ButtonDeleteKeyMatchup from '../buttons/options/button-delete-key-matchup'
import DropdownTeamKeyA from '../dropdown/teams/dropdown-team-key-a'
import DropdownTeamKeyB from '../dropdown/teams/dropdown-team-key-b'
import ImagesMatchesKeys from '../image/images-matches-keys'

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
    data: getMatches,
    isLoading,
    error
  } = useSWR<ExtendedMatch[]>('/api/matches', fetcher)

  const { data: MATCHES_KEYS_A } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys/a',
    fetcher
  )

  const { data: MATCHES_KEYS_B } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys/b',
    fetcher
  )

  if (error) {
    return <p>An ocurred a error!</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const matchesKeyColomnOne = MATCHES_KEYS_A
  const macthesKeyColomnTwo = MATCHES_KEYS_B

  return (
    <div className='space-y-20'>
      <div className='w-[720px] mx-auto'>
        <h2 className='text-5xl font-bold mb-5 text-center'>Keys</h2>

        <div className='flex justify-between mx-auto'>
          <ol className='col-span-2'>
            {matchesKeyColomnOne?.map((matchKey) => (
              <li key={matchKey.id} className='relative'>
                <div className='absolute top-0 -left-12 h-full flex justify-center items-center'>
                  <PopoverDateTeam group='a' match={matchKey} />
                </div>
                {matchKey.status === 'LIVE' && (
                  <div className='absolute top-4 -left-10'>
                    <DropdownTeamKeyA match={matchKey} />
                  </div>
                )}
                <ImagesMatchesKeys match={matchKey} />
                {matchKey.status === 'LIVE' && (
                  <div className='absolute bottom-4 -left-10'>
                    <DropdownTeamKeyB match={matchKey} />
                  </div>
                )}
              </li>
            ))}
          </ol>

          <ol className='col-span-2'>
            {macthesKeyColomnTwo?.map((matchKey) => (
              <li key={matchKey.id} className='relative'>
                <div className='absolute top-0 -right-12 h-full flex justify-center items-center'>
                  <PopoverDateTeam group='b' match={matchKey} />
                </div>
                {matchKey.status === 'LIVE' && (
                  <div className='absolute top-4 -right-10'>
                    <DropdownTeamKeyA match={matchKey} />
                  </div>
                )}
                <ImagesMatchesKeys match={matchKey} />
                {matchKey.status === 'LIVE' && (
                  <div className='absolute bottom-4 -right-10'>
                    <DropdownTeamKeyB match={matchKey} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className='flex py-5 justify-center'>
          <ButtonDeleteKeyMatchup />
        </div>
      </div>

      <div className='flex justify-between'>
        <div className='w-[400px]'>
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
