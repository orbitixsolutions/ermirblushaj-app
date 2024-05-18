import { Avatar, Divider } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import PopoverSemifinalsMatches from '@/components/dashboard/dates/popover/popover-semifinals-team'
import ImagesMatchesKeys from '@/components/dashboard/dates/image/images-matches-keys'
import WrapperImage from '@/components/dashboard/dates/image/wrapper-images'
import useSWR from 'swr'

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

  return (
    <ol>
      {matches?.length !== 0 ? (
        matches?.map((matchKey) => (
          <li key={matchKey.id} className='relative'>
            <div className='absolute w-full h-full flex justify-center items-center'>
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
