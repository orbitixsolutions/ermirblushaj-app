import { Card, Spinner } from '@nextui-org/react'
import { Player } from '@prisma/client'
import PlayerImage from '@/components/new/image/players/player-image'

const CardPlayerImage = ({ player }: { player: Player }) => {
  const imageLoading = player.profilePhoto === null

  return (
    <li>
      <Card className='bg-custom-darknavy relative aspect-square'>
        {imageLoading ? (
          <div className='w-full h-full grid place-items-center'>
            <Spinner color='primary' size='lg' />
          </div>
        ) : (
          <PlayerImage player={player} />
        )}
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
