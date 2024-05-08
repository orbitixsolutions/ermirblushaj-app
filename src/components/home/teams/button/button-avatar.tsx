'use client'

import { useModalTeamStore } from '@/store/modal/use-modal-team-store'
import { Avatar, Button } from '@nextui-org/react'
import { Team } from '@prisma/client'

const ButtonAvatar = ({ team }: { team: Team }) => {
  const handleOpenModal = useModalTeamStore((state) => state.onTeamModalOpenId)

  return (
    <Button
      className='p-0.5 md:p-2 w-full h-full bg-custom-darknavy hover:scale-110'
      isIconOnly
      radius='md'
      onPress={() => handleOpenModal(team.id)}
    >
      <Avatar
        src={team.logo!}
        alt={`Team: ${team.name}`}
        className='w-full h-full object-cover bg-transparent'
      />
    </Button>
  )
}

export default ButtonAvatar
