'use client'

import { Avatar } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import ImagesMatchesKeys from '@/components/dashboard/dates/image/images-matches-keys'
import useSWR from 'swr'
import WrapperImage from '@/components/dashboard/dates/image/wrapper-images'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const skeletonClasses = {
  0: 'translate-y-[0em]'
}

const avatarSkeleton =
  'bg-custom-darkblue text-custom-white size-5 xs:size-12 sm:size-16'

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

  const EMPTY_MATCHES = matches?.length !== 0

  return (
    <ol>
      {EMPTY_MATCHES ? (
        matches?.map((matchKey) => (
          <li key={matchKey.id} className='relative'>
            <WrapperImage className='space-y-[275px]'>
              <ImagesMatchesKeys match={matchKey} />
            </WrapperImage>
          </li>
        ))
      ) : (
        <div className='space-y-[256px] xs:space-y-[252px] sm:space-y-[300px] md:space-y-[300px] px-8'>
          {Array(2)
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
        </div>
      )}
    </ol>
  )
}

export default MatchesSemifinals
