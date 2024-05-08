import { calculateAge } from '@/helpers/calculate-age'
import { Avatar, Card, CardBody, ScrollShadow } from '@nextui-org/react'
import { Player, Team } from '@prisma/client'
import ErrorNoPlayers from '@/components/home/errors/error-no-players'

type ExtendedTeam = Team & {
  players: Player[]
}

interface Props {
  no_players: string
  years: string
  height: string
  position: string
  positions: {
    goalkeeper: string
    attacker: string
  }
}

const ListPlayers = ({
  contentModal,
  team
}: {
  team: ExtendedTeam
  contentModal: Props
}) => {
  const players = team.players

  if (players.length === 0) return <ErrorNoPlayers content={contentModal} />

  const getPosition = (position: string) => {
    if (!position) return

    if (position === 'goalkeeper') return contentModal.positions.goalkeeper
    if (position === 'attacker') return contentModal.positions.attacker
  }

  return (
    <div className='w-full h-full grid place-items-center'>
      <ScrollShadow hideScrollBar className='w-full h-full space-y-2 pr-8'>
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
                <h3 className='text-sm ml-24 xs:ml-36 space-x-2 font-bold'>
                  <span>{player.firstName}</span>
                  <span>{player.lastName}</span>
                </h3>
              </div>

              <div className='bg-custom-darknavy text-custom-lightgray text-xs'>
                <div className='size-full flex flex-col justify-end pb-2 pl-4'>
                  <p className='font-bold'>
                    {calculateAge(player.dateOfBirth!)}
                  </p>
                  <p>{contentModal.years}</p>
                </div>
              </div>
              <div className='bg-custom-darknavy text-custom-lightgray text-xs'>
                <div className='size-full flex flex-col justify-end pb-2'>
                  <p className='font-bold'>{player.height}mt</p>
                  <p>{contentModal.height}</p>
                </div>
              </div>
              <div className='bg-custom-darknavy text-custom-lightgray text-xs'>
                <div className='size-full flex flex-col justify-end pb-2 pr-4'>
                  <p className='font-bold line-clamp-1 capitalize'>
                    {getPosition(player.position!)}
                  </p>
                  <p>{contentModal.position}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </ScrollShadow>
    </div>
  )
}

export default ListPlayers
