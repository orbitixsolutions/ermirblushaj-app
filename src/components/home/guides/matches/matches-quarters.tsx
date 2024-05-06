import { Avatar, Card, CardBody } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import ImagesMatchesKeys from '@/components/dashboard/dates/image/images-matches-keys'
import WrapperImage from '@/components/dashboard/dates/image/wrapper-images'
import useSWR from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
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
    <ol>
      {matches?.length !== 0 ? (
        matches?.map((matchKey) => (
          <li key={matchKey.id} className='relative my-16'>
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
                <Avatar
                key={index}
                radius='sm'
                size='sm'
                className='bg-custom-darkblue text-custom-white size-5 my-16'
              />
            ))}
        </>
      )}
    </ol>
  )
}

export default MatchesQuarters
