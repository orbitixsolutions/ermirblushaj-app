import { Match, Team, TeamStats } from '@prisma/client'
import { Avatar, Button, Card, CardBody } from '@nextui-org/react'
import { isCurrentDate } from '@/helpers/is-today'
import DropdownTeams from '@/components/dashboard/dates/dropdown/teams/dropdown-teams'

type ExtendedMatch = Match & {
  teamA: Team & { teamStats: TeamStats }
  teamB: Team & { teamStats: TeamStats }
}

const ImagesMatches = ({ match }: { match: ExtendedMatch }) => {
  const { teamA, teamB, playStartDate } = match

  return (
    <div className='flex w-full gap-3'>
      <div className='flex-1 relative space-y-3'>
        <Card className='bg-custom-darkblue text-custom-white'>
          <CardBody className='space-x-3 flex-row items-center'>
            <Avatar
              className='w-5 h-5 md:w-8 md:h-8'
              src={teamA.logo!}
              alt={`Team ${teamA.name}`}
            />
            <h2 className='text-xs md:text-sm font-medium line-clamp-1'>
              {teamA.name}
            </h2>
          </CardBody>
        </Card>
        {match.status === 'LIVE' && isCurrentDate(playStartDate!) && (
          <DropdownTeams team={match.teamA}>
            <Button
              fullWidth
              color='primary'
              className='bg-custom-blue'
              endContent={
                <p className='text-xs'>G: {teamA.teamStats.teamGoalsCount}</p>
              }
            >
              <span className='mx-5 font-bold text-xs md:text-sm'>
                Add Goal
              </span>
            </Button>
          </DropdownTeams>
        )}
      </div>

      <div className='flex justify-center items-center'>
        <h2 className='text-lg font-bold'>VS</h2>
      </div>

      <div className='flex-1 relative space-y-3'>
        <Card className='bg-custom-darkblue text-custom-white'>
          <CardBody className='space-x-3 flex-row items-center'>
            <Avatar
              className='w-5 h-5 md:w-8 md:h-8'
              src={teamB.logo!}
              alt={`Team ${teamA.name}`}
            />
            <h2 className='text-xs md:text-sm font-medium line-clamp-1'>
              {teamB.name}
            </h2>
          </CardBody>
        </Card>
        {match.status === 'LIVE' && isCurrentDate(playStartDate!) && (
          <DropdownTeams team={match.teamB}>
            <Button
              fullWidth
              color='primary'
              className='bg-custom-blue'
              endContent={
                <p className='text-xs'>G: {teamB.teamStats.teamGoalsCount}</p>
              }
            >
              <span className='mx-5 font-bold text-xs md:text-sm'>
                Add Goal
              </span>
            </Button>
          </DropdownTeams>
        )}
      </div>
    </div>
  )
}

export default ImagesMatches
