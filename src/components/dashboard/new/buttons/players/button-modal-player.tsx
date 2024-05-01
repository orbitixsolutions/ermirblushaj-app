'use client'

import { useModalPlayerStore } from '@/store/modal/use-modal-player-store'
import { Button, Tooltip } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { toast } from 'sonner'
import axios from 'axios'
import { useActiveTournament } from '@/store/use-active-tournament'

const ButtonModalPlayer = () => {
  const activeTournament = useActiveTournament(
    (state) => state.activeTournament
  )
  const openModal = useModalPlayerStore((state) => state.onPlayerModalOpen)

  const handleOpenModal = async () => {
    const UNDEFINED_TEAMS = 0
    const { data } = await axios.get('/api/teams')

    if (data.length === UNDEFINED_TEAMS) {
      return toast.error('You must create a team for after create players!')
    }

    return openModal()
  }

  return (
    <Button
      isIconOnly
      radius='full'
      onPress={() => handleOpenModal()}
      isDisabled={activeTournament}
      className='bg-transparent border-[1px] border-custom-green'
    >
      <IconPlus size={24} className='text-custom-green' />
    </Button>
  )
}

export default ButtonModalPlayer
