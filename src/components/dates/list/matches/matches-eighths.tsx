import { fetcher } from '@/helpers/fetcher'
import { MatchKey, Team } from '@prisma/client'
import ImagesMatchesKeys from '@/components/dates/image/images-matches-keys'
import PopoverEighthTeam from '@/components/dates/popover/popover-eighth-team'
import WrapperImage from '@/components/dates/image/wrapper-images'
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
  phase: string
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
          >
            <PopoverEighthTeam column={column} phase={phase} match={matchKey} />
          </div>

          <WrapperImage className=''>
            <ImagesMatchesKeys match={matchKey} />
          </WrapperImage>
        </li>
      ))}
    </ol>
  )
}

export default MatchesEighths
