import { Card, Spinner } from '@nextui-org/react'
import { Team } from '@prisma/client'
import TeamImage from '@/components/new/image/teams/team-image'

const CardTeamImage = ({ team }: { team: Team }) => {
  const imageLoading = team.logo === null

  return (
    <li className='col-span-3 xs:col-span-2 md:col-span-1 lg:col-span-2 2xl:col-span-1'>
      <Card className='bg-custom-darknavy relative aspect-square grid place-items-center'>
        {imageLoading ? (
          <div className='w-full h-full grid place-items-center'>
            <Spinner color='primary' size='lg' />
          </div>
        ) : (
          <TeamImage team={team} />
        )}
      </Card>
      <h2 className='text-sm md:text-lg text-center text-custom-white mt-2 line-clamp-1'>
        {team.name}
      </h2>
    </li>
  )
}

export default CardTeamImage
