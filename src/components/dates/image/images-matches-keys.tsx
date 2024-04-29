import { MatchKey, Team } from '@prisma/client'
import { Avatar, Card, CardFooter, Tooltip } from '@nextui-org/react'

type ExtendedMatch = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const ImagesMatchesKeys = ({ match }: { match: ExtendedMatch }) => {
  const { teamKeyA, teamKeyB } = match

  return (
    <div className='flex w-full gap-3'>
      <div className='flex flex-col gap-3 my-5'>
        <Tooltip
          content={
            <div className='flex flex-col gap-2 text-center'>
              <p>{teamKeyA.name}</p>
            </div>
          }
        >
          <Card
            className={`bg-custom-darkblue text-custom-white border-2 ${
              teamKeyA.stageStatus === 'LOSER'
                ? 'border-custom-red'
                : teamKeyA.phase === 'FINAL'
                ? 'border-yellow-400'
                : teamKeyA.stageStatus === 'WINNER'
                ? 'border-custom-green'
                : 'border-gray-600'
            }`}
          >
            <CardFooter className='space-x-3'>
              <Avatar src={teamKeyA.logo!} alt={`Team ${teamKeyA.name}`} />
            </CardFooter>
          </Card>
        </Tooltip>

        <Tooltip
          content={
            <div className='flex flex-col gap-2 text-center'>
              <p>Name: {teamKeyB.name}</p>
            </div>
          }
        >
          <Card
            className={`bg-custom-darkblue text-custom-white border-2 ${
              teamKeyB.stageStatus === 'LOSER'
                ? 'border-custom-red'
                : teamKeyB.phase === 'FINAL'
                ? 'border-yellow-400'
                : teamKeyB.stageStatus === 'WINNER'
                ? 'border-custom-green'
                : 'border-gray-600'
            }`}
          >
            <CardFooter className='space-x-3'>
              <Avatar src={teamKeyB.logo!} alt={`Team ${teamKeyB.name}`} />
            </CardFooter>
          </Card>
        </Tooltip>
      </div>
    </div>
  )
}

export default ImagesMatchesKeys
