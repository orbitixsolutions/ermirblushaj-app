import { Avatar, Card } from '@nextui-org/react'
import { Team } from '@prisma/client'
import DropdownTeam from '@/components/dashboard/new/dropdown/dropdown-team'

const CardTeamImage = ({ team }: { team: Team }) => {
  return (
    <li className='col-span-3 xs:col-span-2 md:col-span-1 lg:col-span-2 2xl:col-span-1'>
      <Card className='bg-custom-darknavy relative aspect-square grid place-items-center'>
        <div className='relative size-full grid place-items-center'>
          <div className='w-full p-2 absolute bottom-0 left-0 right-0 z-40 flex gap-2'>
            <DropdownTeam team={team} />
          </div>

          <Avatar
            isBordered
            className='w-20 h-20 md:w-24 md:h-24 lg:w-16 lg:h-16'
            src={team.logo!}
            alt={team.name}
          />
        </div>
      </Card>
      <h2 className='text-sm md:text-lg text-center text-custom-white mt-2 line-clamp-1'>
        {team.name}
      </h2>
    </li>
  )
}

export default CardTeamImage
