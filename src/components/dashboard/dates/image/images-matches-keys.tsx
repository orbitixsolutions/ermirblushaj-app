import { MatchKey, Team } from '@prisma/client'
import { Avatar, Card, CardFooter, Tooltip } from '@nextui-org/react'

type ExtendedMatch = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const ImagesMatchesKeys = ({ match }: { match: ExtendedMatch }) => {
  const { teamKeyA, teamKeyB } = match

  return (
    <>
      <Tooltip
        content={
          <div className='text-center'>
            <p>{teamKeyA.name}</p>
          </div>
        }
      >
        <Card
          className={`bg-custom-darkblue text-custom-white border-2 ${
            teamKeyA.stageStatus === 'LOSER'
              ? 'border-custom-red'
              : teamKeyA.stageStatus === 'WINNER'
              ? 'border-custom-green'
              : 'border-gray-600'
          }`}
        >
          <CardFooter>
            <Avatar
              size='sm'
              src={teamKeyA.logo!}
              alt={`Team ${teamKeyA.name}`}
            />
          </CardFooter>
        </Card>
      </Tooltip>

      <Tooltip
        content={
          <div className='text-center'>
            <p>{teamKeyB.name}</p>
          </div>
        }
      >
        <Card
          className={`bg-custom-darkblue text-custom-white border-2 ${
            teamKeyB.stageStatus === 'LOSER'
              ? 'border-custom-red'
              : teamKeyB.stageStatus === 'WINNER'
              ? 'border-custom-green'
              : 'border-gray-600'
          }`}
        >
          <CardFooter>
            <Avatar
              size='sm'
              src={teamKeyB.logo!}
              alt={`Team ${teamKeyB.name}`}
            />
          </CardFooter>
        </Card>
      </Tooltip>
    </>
  )
}

export default ImagesMatchesKeys
