'use client'

import { useActiveTournament } from '@/store/use-active-tournament'
import { useModalTeamStore } from '@/store/modal/use-modal-team-store'
import { Button, Tooltip } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { toast } from 'sonner'
import axios from 'axios'

const ButtonModalTeam = () => {
  const activeTournament = useActiveTournament(
    (state) => state.activeTournament
  )
  const openModal = useModalTeamStore((state) => state.onTeamModalOpen)

  const handleOpenModal = async () => {
    const UNDEFINED_TEAMS = 20
    const { data } = await axios.get('/api/teams')

    if (data.length === UNDEFINED_TEAMS) {
      return toast.error('Team limit reached (20)')
    }

    return openModal()
  }

  return (
    <Tooltip content='Create team'>
      <Button
        isIconOnly
        radius='full'
        onPress={() => handleOpenModal()}
        isDisabled={activeTournament}
        className='bg-transparent border-[1px] border-custom-green'
      >
        <IconPlus size={24} className='text-custom-green' />
      </Button>
    </Tooltip>
  )
}

export default ButtonModalTeam
