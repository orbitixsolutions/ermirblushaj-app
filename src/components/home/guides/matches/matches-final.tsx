'use client'

import { fetcher } from '@/helpers/fetcher'
import { Avatar } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import ImagesMatchesKeys from '@/components/dashboard/dates/image/images-matches-keys'
import WrapperImage from '@/components/dashboard/dates/image/wrapper-images'
import useSWR from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const avatarSkeleton =
  'bg-custom-darkblue text-custom-white size-5 xs:size-12 sm:size-16 my-4'

const MatchesFinal = ({ column, phase }: { column: string; phase: string }) => {
  const { data: matches } = useSWR<ExtendedMatchKey[]>(
    `/api/matches/keys?column=${column}&phase=${phase}`,
    fetcher
  )

  const EMPTY_MATCHES = matches?.length !== 0

  return (
    <ol className='flex gap-2'>
      {EMPTY_MATCHES ? (
        matches?.map((matchKey) => (
          <li key={matchKey.id} className='relative'>
            <WrapperImage className='space-y-12'>
              <ImagesMatchesKeys match={matchKey} />
            </WrapperImage>
          </li>
        ))
      ) : (
        <div className='space-y-12'>
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <Avatar
                key={index}
                size='sm'
                radius='sm'
                className={avatarSkeleton}
              />
            ))}
        </div>
      )}
    </ol>
  )
}

export default MatchesFinal
