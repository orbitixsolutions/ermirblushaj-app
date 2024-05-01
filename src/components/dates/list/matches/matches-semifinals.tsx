import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import PopoverSemifinalsMatches from '@/components/dates/popover/popover-semifinals-team'
import ImagesMatchesKeys from '@/components/dates/image/images-matches-keys'
import WrapperImage from '@/components/dates/image/wrapper-images'
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
  a: 'left-48',
  b: 'right-48'
}

const MatchesSemifinals = ({
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
                  className='absolute w-full h-full flex justify-center items-center'
                >
                  <PopoverSemifinalsMatches
                    column={column}
                    phase={phase}
                    match={matchKey}
                  />
                </div>

                <div className='absolute w-full h-full flex justify-center items-center'>
                  <Divider
                    orientation='vertical'
                    className='bg-custom-lightgray h-80'
                  />
                </div>

                <WrapperImage className='space-y-[275px]'>
                  <ImagesMatchesKeys match={matchKey} />
                </WrapperImage>
              </li>
            ))
          ) : (
            <>
              {Array(2)
                .fill(0)
                .map((_, index) => (
                  <Card
                    key={index}
                    className='bg-custom-darkblue text-custom-white my-72'
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

export default MatchesSemifinals
