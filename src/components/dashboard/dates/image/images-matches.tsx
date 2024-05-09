import { Match, Team, TeamStats } from '@prisma/client'
import { Avatar, Card, CardFooter } from '@nextui-org/react'
import { DropdownTeamA } from '@/components/dashboard/dates/dropdown/teams/dropdown-team-a'
import { DropdownTeamB } from '@/components/dashboard/dates/dropdown/teams/dropdown-team-b'
import { isCurrentDate } from '@/helpers/is-today'
import { IconCaretLeftFilled, IconCaretRightFilled } from '@tabler/icons-react'

type ExtendedMatch = Match & {
  teamA: Team & { teamStats: TeamStats }
  teamB: Team & { teamStats: TeamStats }
}

const ImagesMatches = ({ match }: { match: ExtendedMatch }) => {
  const { teamA, teamB, playStartDate } = match

  return (
    <div className='flex w-full gap-3'>
      <div className='flex-1 relative'>
        <Card className='bg-custom-darkblue text-custom-white'>
          <CardFooter className='space-x-3'>
            <Avatar className='w-5 h-5 md:w-8 md:h-8' src={teamA.logo!} alt={`Team ${teamA.name}`} />
            <h2 className='text-xs md:text-sm font-medium line-clamp-1'>
              {teamA.name}
            </h2>
          </CardFooter>
        </Card>
        {match.status === 'LIVE' && isCurrentDate(playStartDate!) && (
          <div className='flex flex-col absolute top-0 left-[-3.5rem] md:left-[-5rem] w-[65px]'>
            <h3 className='text-sm md:text-base text-center md:text-end'>
              Goals
            </h3>
            <div className='flex items-center flex-col-reverse md:flex-row'>
              <p>{teamA.teamStats.goalsFor}</p>
              <IconCaretLeftFilled className='text-custom-blue hidden md:block' />
              <DropdownTeamA match={match} />
            </div>
          </div>
        )}
      </div>

      <div className='grid place-items-center relative'>
        <h2 className='text-lg font-bold'>VS</h2>
      </div>

      <div className='flex-1 relative'>
        <Card className='bg-custom-darkblue text-custom-white'>
          <CardFooter className='space-x-3'>
            <Avatar className='w-5 h-5 md:w-8 md:h-8' src={teamB.logo!} alt={`Team ${teamA.name}`} />
            <h2 className='text-xs md:text-sm font-medium line-clamp-1'>
              {teamB.name}
            </h2>
          </CardFooter>
        </Card>
        {match.status === 'LIVE' && isCurrentDate(playStartDate!) && (
          <div className='flex flex-col absolute top-0 right-[-3.5rem] md:right-[-5rem] w-[65px]'>
            <h3 className='text-sm md:text-base text-center md:text-start'>
              Goals
            </h3>
            <div className='flex items-center flex-col md:flex-row'>
              <DropdownTeamB match={match} />
              <IconCaretRightFilled className='text-custom-blue hidden md:block' />
              <p>{teamB.teamStats.goalsFor}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImagesMatches
