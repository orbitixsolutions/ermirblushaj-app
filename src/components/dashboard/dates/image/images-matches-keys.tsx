import { MatchKey, Team } from '@prisma/client'
import { Avatar, Tooltip } from '@nextui-org/react'

type ExtendedMatch = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const avatarStyles =
  'bg-custom-darkblue text-custom-white size-8 xs:size-12 sm:size-16 p-1 border-2'

const ImagesMatchesKeys = ({ match }: { match: ExtendedMatch }) => {
  const { teamKeyA, teamKeyB } = match

  return (
    <>
      <Tooltip
        className='bg-custom-teal text-custom-white'
        content={
          <div className='text-center'>
            <p>{teamKeyA.name}</p>
            <p> {teamKeyA.id}</p>
          </div>
        }
      >
        <Avatar
          size='sm'
          radius='sm'
          className={`${avatarStyles} ${
            teamKeyA.stageStatus === 'LOSER'
              ? 'border-custom-red'
              : teamKeyA.stageStatus === 'WINNER'
              ? 'border-custom-green'
              : 'border-gray-600'
          }`}
          src={teamKeyA.logo!}
          alt={`Team ${teamKeyA.name}`}
        />
      </Tooltip>

      <Tooltip
        className='bg-custom-teal text-custom-white'
        content={
          <div className='text-center'>
            <p>{teamKeyB.name}</p>
            <p>{teamKeyB.id}</p>
          </div>
        }
      >
        <Avatar
          size='sm'
          radius='sm'
          className={`${avatarStyles} ${
            teamKeyB.stageStatus === 'LOSER'
              ? 'border-custom-red'
              : teamKeyB.stageStatus === 'WINNER'
              ? 'border-custom-green'
              : 'border-gray-600'
          }`}
          src={teamKeyB.logo!}
          alt={`Team ${teamKeyB.name}`}
        />
      </Tooltip>
    </>
  )
}

export default ImagesMatchesKeys
