import { Image } from '@nextui-org/react'
import { Team } from '@prisma/client'
import DropdownTeam from '@/components/new/dropdown/dropdown-team'

const TeamImage = ({ team }: { team: Team }) => {
  return (
    <div className='relative'>
      <>
        <div className='w-full p-2 absolute bottom-0 left-0 right-0 z-40 flex gap-2'>
          <DropdownTeam team={team} />
        </div>

        <Image
          className='aspect-square object-cover'
          src={team.logo || ''}
          alt={team.name}
        />
      </>
    </div>
  )
}

export default TeamImage
