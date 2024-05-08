import { Player } from '@prisma/client'
import { Avatar, Image } from '@nextui-org/react'
import DropdownPlayer from '@/components/dashboard/new/dropdown/dropdown-player'

interface Props {
  player: Player
}

const PlayerImage = ({ player }: Props) => {
  return (
    <div className='relative size-full grid place-items-center'>
      <>
        <div className='w-full p-2 absolute bottom-0 left-0 right-0 z-40 flex gap-2'>
          <DropdownPlayer player={player} />
        </div>

        <Avatar
          isBordered
          className='bg-transparent w-20 h-20 md:w-24 md:h-24'
          src={player.profilePhoto!}
          alt={player.firstName}
        />
      </>
    </div>
  )
}

export default PlayerImage
