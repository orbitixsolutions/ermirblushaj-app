import { Match, Team } from '@prisma/client'
import { Avatar, Card, CardFooter } from '@nextui-org/react'
import { DropdownTeamA } from '@/components/dates/dropdown/teams/dropdown-team-a'
import { DropdownTeamB } from '@/components/dates/dropdown/teams/dropdown-team-b'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const ImagesMatches = ({ match }: { match: ExtendedMatch }) => {
  const { teamA, teamB } = match

  return (
    <div className='flex w-full gap-3'>
      <div className='flex-1 relative'>
        <Card className=' bg-custom-darkblue text-custom-white'>
          <CardFooter className='space-x-3'>
            <Avatar src={teamA.logo!} alt={`Team ${teamA.name}`} />
            <h2 className='text-sm font-medium line-clamp-2'>{teamA.name}</h2>
          </CardFooter>
        </Card>
        {match.status === 'LIVE' && (
          <div className='flex flex-col absolute gap-1 top-0 left-[-4rem]'>
            <h3>Goals</h3>
            <DropdownTeamA match={match} />
          </div>
        )}
      </div>

      <div className='grid place-items-center relative'>
        <h2 className='text-xl font-bold'>VS</h2>
      </div>

      <div className='flex-1 relative'>
        <Card className='bg-custom-darkblue text-custom-white'>
          <CardFooter className='space-x-3'>
            <Avatar src={teamB.logo!} alt={`Team ${teamA.name}`} />
            <h2 className='text-sm font-medium line-clamp-2'>{teamB.name}</h2>
          </CardFooter>
        </Card>
        {match.status === 'LIVE' && (
          <div className='flex flex-col absolute gap-1 top-0 right-[-4rem]'>
            <h3>Goals</h3>
            <DropdownTeamB match={match} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ImagesMatches
