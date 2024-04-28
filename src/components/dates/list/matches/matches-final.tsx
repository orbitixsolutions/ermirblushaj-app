import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, CardBody } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import ImagesMatchesKeys from '../../image/images-matches-keys'
import useSWR from 'swr'
import PopoverFinalsTeam from '../../popover/popover-finals-team'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const columnPopover = {
  none: ''
}

const columnClass = {
  none: 'left-[28rem]'
}

const MatchesFinal = ({ column, phase }: { column: string; phase: string }) => {
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
                  className={`absolute top-32 w-full h-full flex justify-center items-center ${
                    columnPopover[column as keyof typeof columnPopover] || ''
                  }`}
                >
                  <PopoverFinalsTeam
                    column={column}
                    phase={phase}
                    match={matchKey}
                  />
                </div>

                <div className='my-28'>
                  <ImagesMatchesKeys match={matchKey} />
                </div>
              </li>
            ))
          ) : (
            <>
              {Array(2)
                .fill(0)
                .map((_, index) => (
                  <Card
                    key={index}
                    className='bg-custom-darkblue text-custom-white my-28'
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

export default MatchesFinal
