'use client'

import { useModalTeamStore } from '@/store/modal/use-modal-team-store'
import { Avatar, Card } from '@nextui-org/react'
import { Team } from '@prisma/client'

const TeamItem = ({ team }: { team: Team }) => {
  const handleOpenModal = useModalTeamStore((state) => state.onTeamModalOpenId)

  return (
    <li
      key={team.id}
      className='aspect-square border-custom-lightgray space-y-1'
    >
      <Card
        isPressable
        onPress={() => handleOpenModal(team.id)}
        radius='md'
        className='bg-custom-darkblue size-full p-4 xs:p-6 md:p-10'
      >
        <Avatar
          src={team.logo!}
          alt={`Team: ${team.name}`}
          className='w-full h-full object-cover bg-transparent'
        />
      </Card>
      <Card radius='md' className='bg-custom-darkblue text-custom-white'>
        <h2 className='text-xs md:text-lg text-center font-light line-clamp-1 py-1.5'>
          {team.name}
        </h2>
      </Card>
    </li>
  )
}

export default TeamItem
