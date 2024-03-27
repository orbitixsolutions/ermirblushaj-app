import { Card, Image } from '@nextui-org/react'
import { Match, Team } from '@prisma/client'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const ImagesMatches = ({ item }: { item: ExtendedMatch }) => {
  const { teamA, teamB } = item

  return (
    <div className='col-span-4 flex gap-4'>
      <div className='text-center space-y-4'>
        <Card className='aspect-square p-4 bg-custom-navy'>
          <Image
            className='size-full object-cover'
            src={teamA.logo || ''}
            alt={`Logo team ${teamA.name}`}
          />
        </Card>
        <h2>{teamA.name}</h2>
      </div>
      <div className='grid place-items-center'>
        <h2 className='-translate-y-2 text-xl font-bold'>VS</h2>
      </div>
      <div className='text-center space-y-4'>
        <Card className='aspect-square p-4 bg-custom-navy'>
          <Image
            className='size-full object-cover'
            src={teamB.logo || ''}
            alt={`Logo team ${teamA.name}`}
          />
        </Card>
        <h2>{teamB.name}</h2>
      </div>
    </div>
  )
}

export default ImagesMatches
