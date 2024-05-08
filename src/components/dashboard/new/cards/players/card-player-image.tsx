import { Avatar, Card } from '@nextui-org/react'
import { Player } from '@prisma/client'
import DropdownPlayer from '@/components/dashboard/new/dropdown/dropdown-player'

const CardPlayerImage = ({ player }: { player: Player }) => {
  return (
    <li className='col-span-3 xs:col-span-2 md:col-span-1 lg:col-span-2 2xl:col-span-1'>
      <Card className='bg-custom-darknavy relative aspect-square'>
        <div className='relative size-full grid place-items-center'>
          <div className='w-full p-2 absolute bottom-0 left-0 right-0 z-40 flex gap-2'>
            <DropdownPlayer player={player} />
          </div>

          <Avatar
          isBordered
            className='w-20 h-20 md:w-24 md:h-24'
            src={player.profilePhoto!}
            alt={player.firstName}
          />
        </div>
      </Card>
      <div className='flex-col mt-2'>
        <h2 className='text-sm md:text-lg text-center text-custom-white mt-2 line-clamp-1'>
          {player.firstName} {player.lastName}
        </h2>
        <h3 className='text-center text-sm text-custom-lightgray'>
          <span className='text-xs md:text-sm font-bold underline line-clamp-1'>
            {player.teamName}
          </span>
        </h3>
      </div>
    </li>
  )
}

export default CardPlayerImage
