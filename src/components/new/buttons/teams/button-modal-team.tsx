'use client'

import { useModalTeamStore } from '@/store/modal/use-modal-team-store'
import { Button, Tooltip } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { toast } from 'sonner'
import axios from 'axios'

const ButtonModalTeam = () => {
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
    <Tooltip
      content={<h2 className='px-4 py-2 text-sm font-bold'>Add team</h2>}
    >
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

export default ButtonModalTeam
