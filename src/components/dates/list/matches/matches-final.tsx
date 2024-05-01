import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import ImagesMatchesKeys from '@/components/dates/image/images-matches-keys'
import PopoverFinalsTeam from '@/components/dates/popover/popover-finals-team'
import WrapperImage from '@/components/dates/image/wrapper-images'
import useSWR from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const columnPopover = {
  none: ''
}

const columnClass = {
  none: ''
}

const MatchesFinal = ({ column, phase }: { column: string; phase: string }) => {
  const { data: matches } = useSWR<ExtendedMatchKey[]>(
    `/api/matches/keys?column=${column}&phase=${phase}`,
    fetcher
  )

  return (
    <div
      className={`absolute top-0 h-full flex mx-auto w-full justify-center items-center ${
        columnClass[column as keyof typeof columnClass] || ''
      }`}
    >
      <div className='w-[80px] flex justify-center items-center'>
        <ol>
          {matches?.length !== 0 ? (
            matches?.map((matchKey) => (
              <li key={matchKey.id} className='relative'>
                <div
                  className={`absolute w-full h-full flex justify-center items-center ${
                    columnPopover[column as keyof typeof columnPopover] || ''
                  }`}
                >
                  <PopoverFinalsTeam
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

                <WrapperImage className='space-y-16'>
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
                    className='bg-custom-darkblue text-custom-white my-4'
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

export default MatchesFinal
