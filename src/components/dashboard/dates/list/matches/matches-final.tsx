import { fetcher } from '@/helpers/fetcher'
import { Avatar, Divider } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import ImagesMatchesKeys from '@/components/dashboard/dates/image/images-matches-keys'
import PopoverFinalsTeam from '@/components/dashboard/dates/popover/popover-finals-team'
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

  return (
    <ol>
      {matches?.length !== 0 ? (
        matches?.map((matchKey) => (
          <li key={matchKey.id} className='relative'>
            <div className='absolute w-full h-full flex justify-center items-center'>
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
