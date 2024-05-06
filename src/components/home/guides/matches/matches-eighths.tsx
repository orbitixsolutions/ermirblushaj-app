'use client'

import { MatchKey, Team, TournamentPhase } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import ImagesMatchesKeys from '@/components/dashboard/dates/image/images-matches-keys'
import WrapperImage from '@/components/dashboard/dates/image/wrapper-images'
import useSWR from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const columnClasses = {
  a: '-left-12',
  b: '-right-12'
}

const MatchesEighths = ({
  column,
  phase
}: {
  column: string
  phase: TournamentPhase
}) => {
  const { data: matches } = useSWR<ExtendedMatchKey[]>(
    `/api/matches/keys?column=${column}&phase=${phase}`,
    fetcher
  )

  return (
    <ol>
      {matches?.map((matchKey) => (
        <li key={matchKey.id} className='relative'>
          <div
            className={`absolute top-0 h-full flex justify-center items-center ${
              columnClasses[column as keyof typeof columnClasses] || ''
            }`}
          ></div>

          <WrapperImage>
            <ImagesMatchesKeys match={matchKey} />
          </WrapperImage>
        </li>
      ))}
    </ol>
  )
}

export default MatchesEighths
