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

const skeletonClasses = {
  0: '-translate-y-[7.95rem] xs:-translate-y-[9.5rem] sm:-translate-y-[11rem]',
  1: '-translate-y-[2.55rem] xs:-translate-y-[3.4rem] sm:-translate-y-[3.85rem]',
  2: 'translate-y-[2.55rem] xs:translate-y-[3rem] sm:translate-y-[3.85rem]',
  3: 'translate-y-[7.95rem] xs:translate-y-[9.5rem] sm:translate-y-[11rem]'
}

const avatarSkeleton =
  'bg-custom-darkblue text-custom-white size-5 xs:size-12 sm:size-16'

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
                className={`${avatarSkeleton} ${
                  skeletonClasses[index as keyof typeof skeletonClasses]
                }`}
              />
            ))}
        </>
      )}
    </ol>
  )
}

export default MatchesQuarters
