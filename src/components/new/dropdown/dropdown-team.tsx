'use client'

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection
} from '@nextui-org/react'
import {
  IconCirclePlus,
  IconEdit,
  IconSettings,
  IconTrash
} from '@tabler/icons-react'
import { Team } from '@prisma/client'
import { useModalTeamStore } from '@/store/modal/use-modal-team-store'
import { deleteTeam } from '@/actions/services/delete'
import { toast } from 'sonner'
import { useModalPlayerStore } from '@/store/modal/use-modal-player-store'
import { useState } from 'react'
import { deleteImage } from '@/helpers/delete-image'

const DropdownTeam = ({ team }: { team: Team }) => {
  const [isPending, setIsPending] = useState(false)

  const { onPlayerOpenId } = useModalPlayerStore((state) => ({
    onPlayerOpenId: state.onPlayerModalOpenId
  }))

  const { onTeamModalEdit } = useModalTeamStore((state) => ({
    onTeamModalEdit: state.onTeamModalEdit
  }))

  const handleEditMode = (id: string) => {
    onTeamModalEdit(id)
  }

  const handleDeleteTeam = async (teamId: string) => {
    setIsPending(true)
    await deleteImage({ path: 'teams', id: teamId })

    const res = await deleteTeam(teamId)
    if (res.status === 200) {
      setIsPending(false)
      return toast.success(res.success)
    }

    setIsPending(false)
    return toast.error('An ocurred a error')
  }

  return (
    <Dropdown className='bg-custom-darknavy text-custom-white'>
      <DropdownTrigger>
        <Button
          isLoading={isPending}
          isIconOnly
          radius='full'
          className='bg-custom-green'
        >
          <IconSettings size={24} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Options'>
        <DropdownSection title='Actions' showDivider>
          <DropdownItem
            key='add-player'
            color='primary'
            onPress={() => onPlayerOpenId(team)}
            startContent={<IconCirclePlus size={24} />}
          >
            Add player
          </DropdownItem>
          <DropdownItem
            key='edit'
            color='primary'
            onPress={() => handleEditMode(team.id)}
            startContent={<IconEdit size={24} />}
          >
            Edit team
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title='Danger' showDivider>
          <DropdownItem
            key='delete'
            color='danger'
            onPress={() => handleDeleteTeam(team.id)}
            className='text-danger'
            startContent={<IconTrash size={24} />}
          >
            Delete team
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownTeam
