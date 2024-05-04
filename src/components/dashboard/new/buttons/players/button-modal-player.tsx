'use client'

import { useModalPlayerStore } from '@/store/modal/use-modal-player-store'
import { Button, Tooltip } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { toast } from 'sonner'
import axios from 'axios'

const ButtonModalPlayer = () => {
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
    <Tooltip content='Create player'>
      <Button
        isIconOnly
        radius='full'
        onPress={() => handleOpenModal()}
        className='bg-transparent border-[1px] border-custom-green'
      >
        <IconPlus size={24} className='text-custom-green' />
      </Button>
    </Tooltip>
  )
}

export default ButtonModalPlayer
