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
  0: '-translate-y-[0.25em] xs:translate-y-[1em] sm:translate-y-[1.5em]',
  1: 'translate-y-[0em] xs:translate-y-[0.15em] sm:translate-y-[0.5em]',
  2: '-translate-y-[0em] xs:translate-y-[-0.25em] sm:translate-y-[-0.5em]',
  3: 'translate-y-[.40rem] xs:translate-y-[-1rem] sm:translate-y-[-1.5em]'
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

  const EMPTY_MATCHES = matches?.length !== 0

  return (
    <ol>
      {EMPTY_MATCHES ? (
        matches?.map((matchKey) => (
          <li key={matchKey.id} className='relative my-16'>
            <WrapperImage className='space-y-28'>
              <ImagesMatchesKeys match={matchKey} />
            </WrapperImage>
          </li>
        ))
      ) : (
        <div className='space-y-20 xs:space-y-[108px] sm:space-y-[128px]'>
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

export default MatchesQuarters
