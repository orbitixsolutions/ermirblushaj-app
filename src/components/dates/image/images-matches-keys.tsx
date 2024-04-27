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
             <p>Name: {teamKeyA.name}</p>
              <p>ID: {teamKeyA.id}</p>
              <p>Phase: {teamKeyA.phase}</p>
            </div>
          }
        >
          <Card
            className={`bg-custom-darkblue text-custom-white border-2 ${
              teamKeyA.isEliminated
                ? 'border-custom-red'
                : teamKeyA.phase === 'QUARTER' || 'SEMIFINALS'
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
              <p>ID: {teamKeyB.id}</p>
              <p>Phase: {teamKeyB.phase}</p>
            </div>
          }
        >
          <Card
            className={`bg-custom-darkblue text-custom-white border-2 ${
              teamKeyB.isEliminated
                ? 'border-custom-red'
                : teamKeyB.phase === 'QUARTER' || 'SEMIFINALS'
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
