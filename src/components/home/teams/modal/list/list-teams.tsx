import { calculateAge } from '@/helpers/calculate-age'
import { Avatar, Card, CardBody, ScrollShadow } from '@nextui-org/react'
import { Player, Team } from '@prisma/client'

type ExtendedTeam = Team & {
  players: Player[]
}

const ListTeam = ({ team }: { team: ExtendedTeam }) => {
  const players = team.players

  return (
    <ScrollShadow
      hideScrollBar
      className='w-full h-full flex items-center pr-8'
    >
      <ol className='w-full grid grid-cols-1 gap-2'>
        {players.map((player) => (
          <Card
            key={player.id}
            className='relative border-2 border-custom-lightgray  h-20 bg-transparent'
          >
            <CardBody className=' grid grid-cols-4 p-0'>
              <div className='bg-custom-green h-full w-full grid place-items-center z-20'>
                <Avatar isBordered src={player.profilePhoto!} />
              </div>

              <div className='absolute right-0 w-full bg-custom-green py-1.5'>
                <h3 className='text-sm ml-24 xs:ml-36 space-x-2'>
                  <span>{player.firstName}</span>
                  <span className='font-bold'>{player.lastName}</span>
                </h3>
              </div>

              <div className='bg-custom-darknavy text-custom-lightgray text-xs'>
                <div className='size-full flex flex-col justify-end pb-2 pl-4'>
                  <p className='font-bold'>
                    {calculateAge(player.dateOfBirth!)}
                  </p>
                  <p>Years</p>
                </div>
              </div>
              <div className='bg-custom-darknavy text-custom-lightgray text-xs'>
                <div className='size-full flex flex-col justify-end pb-2'>
                  <p className='font-bold'>{player.height}mt</p>
                  <p>Height</p>
                </div>
              </div>
              <div className='bg-custom-darknavy text-custom-lightgray text-xs'>
                <div className='size-full flex flex-col justify-end pb-2 pr-4'>
                  <p className='font-bold line-clamp-1 capitalize'>
                    {player.position}
                  </p>
                  <p>Position</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </ol>
    </ScrollShadow>
  )
}

export default ListTeam
