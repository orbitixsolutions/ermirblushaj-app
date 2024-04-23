import { MatchKey, Team } from '@prisma/client'
import { Avatar, Card, CardFooter } from '@nextui-org/react'

type ExtendedMatch = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const ImagesMatchesKeys = ({ match }: { match: ExtendedMatch }) => {
  const { teamKeyA, teamKeyB } = match

  return (
    <div className='flex w-full gap-3'>
      <div className='flex flex-col gap-3 my-5'>
        <Card className='bg-custom-darkblue text-custom-white'>
          <CardFooter className='space-x-3'>
            <Avatar src={teamKeyA.logo!} alt={`Team ${teamKeyA.name}`} />
          </CardFooter>
        </Card>

        <Card className=' bg-custom-darkblue text-custom-white'>
          <CardFooter className='space-x-3'>
            <Avatar src={teamKeyB.logo!} alt={`Team ${teamKeyB.name}`} />
          </CardFooter>
        </Card>
      
      </div>
    </div>
  )
}

export default ImagesMatchesKeys
