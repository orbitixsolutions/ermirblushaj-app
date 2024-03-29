import { Match, Team } from '@prisma/client'
import { DropdownTeamA } from '@/components/dates/dropdown/teams/dropdown-team-a'
import { DropdownTeamB } from '@/components/dates/dropdown/teams/dropdown-team-b'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const ImagesMatches = ({ item }: { item: ExtendedMatch }) => {
  const { teamA, teamB } = item

  return (
    <div className='col-span-4 flex gap-4'>
      <div className='text-center space-y-4'>
        <DropdownTeamA item={item} />
        <h2>{teamA.name}</h2>
      </div>
      <div className='grid place-items-center'>
        <h2 className='-translate-y-2 text-xl font-bold'>VS</h2>
      </div>
      <div className='text-center space-y-4'>
        <DropdownTeamB item={item} />
        <h2>{teamB.name}</h2>
      </div>
    </div>
  )
}

export default ImagesMatches
