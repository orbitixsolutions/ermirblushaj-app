import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, CardBody } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import ImagesMatchesKeys from '../../image/images-matches-keys'
import PopoverQuarterMatches from '../../popover/popover-quarters-team'
import useSWR from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const columnPopover = {
  a: '-left-12',
  b: '-right-12'
}

const columnClass = {
  a: 'left-32',
  b: 'right-32'
}

const MatchesQuarters = ({
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
    <div
      className={`absolute top-0 h-full flex justify-center items-center ${
        columnClass[column as keyof typeof columnClass] || ''
      }`}
    >
      <div className='w-[80px] flex justify-center items-center'>
        <ol>
          {matches?.length !== 0 ? (
            matches?.map((matchKey) => (
              <li key={matchKey.id} className='relative'>
                <div
                  className={`absolute top-0 h-full flex justify-center items-center ${
                    columnPopover[column as keyof typeof columnPopover] || ''
                  }`}
                >
                  <PopoverQuarterMatches
                    column={column}
                    phase={phase}
                    match={matchKey}
                  />
                </div>

                <ImagesMatchesKeys match={matchKey} />
              </li>
            ))
          ) : (
            <>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Card
                    key={index}
                    className='bg-custom-darkblue text-custom-white mb-32'
                  >
                    <CardBody>
                      <Avatar />
                    </CardBody>
                  </Card>
                ))}
            </>
          )}
        </ol>
      </div>
    </div>
  )
}

export default MatchesQuarters
