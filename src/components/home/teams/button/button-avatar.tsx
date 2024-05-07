'use client'

import { useModalTeamStore } from '@/store/modal/use-modal-team-store'
import { Avatar } from '@nextui-org/react'
import { Team } from '@prisma/client'

const ButtonAvatar = ({ team }: { team: Team }) => {
  const handleOpenModal = useModalTeamStore((state) => state.onTeamModalOpenId)

  return (
    <Avatar
      isBordered
      onClick={() => handleOpenModal(team.id)}
      className='bg-transparent w-full h-full'
      src={team.logo!}
      alt={`Team: ${team.name}`}
    />
  )
}

export default ButtonAvatar
