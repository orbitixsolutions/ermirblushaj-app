import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import ImagesMatchesKeys from '@/components/dashboard/dates/image/images-matches-keys'
import PopoverQuarterMatches from '@/components/dashboard/dates/popover/popover-quarters-team'
import WrapperImage from '@/components/dashboard/dates/image/wrapper-images'
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
  a: 'left-28',
  b: 'right-28'
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
              <li key={matchKey.id} className='relative my-16'>
                <div className='absolute w-full h-full flex justify-center items-center'>
                  <PopoverQuarterMatches
                    column={column}
                    phase={phase}
                    match={matchKey}
                  />
                </div>

                <div className='absolute w-full h-full flex justify-center items-center'>
                  <Divider
                    orientation='vertical'
                    className='bg-custom-lightgray h-32'
                  />
                </div>

                <WrapperImage className='space-y-28'>
                  <ImagesMatchesKeys match={matchKey} />
                </WrapperImage>
              </li>
            ))
          ) : (
            <>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Card
                    key={index}
                    className='bg-custom-darkblue text-custom-white my-28'
                  >
                    <CardBody>
                      <Avatar size='sm' />
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
