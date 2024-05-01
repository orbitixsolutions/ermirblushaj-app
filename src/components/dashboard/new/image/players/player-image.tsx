import { Player } from '@prisma/client'
import { Image } from '@nextui-org/react'
import DropdownPlayer from '@/components/dashboard/new/dropdown/dropdown-player'

interface Props {
  player: Player
}

const PlayerImage = ({ player }: Props) => {
  return (
    <div className='relative'>
      <>
        <div className='w-full p-2 absolute bottom-0 left-0 right-0 z-40 flex gap-2'>
          <DropdownPlayer player={player} />
        </div>

        <Image
          className='aspect-square object-cover'
          src={player.profilePhoto || ''}
          alt={player.firstName}
        />
      </>
    </div>
  )
}

export default PlayerImage
