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
import { useTransition } from 'react'
import { deleteImage } from '@/helpers/delete-image'
import { mutate } from 'swr'
import { useActiveTournament } from '@/store/use-active-tournament'

const DropdownTeam = ({ team }: { team: Team }) => {
  const [isPending, startTransition] = useTransition()

  const activeTournament = useActiveTournament(
    (state) => state.activeTournament
  )

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
    startTransition(async () => {
      if (team.logo !== null) {
        await deleteImage({ path: 'teams', id: teamId })
      }

      const { status, message } = await deleteTeam(teamId)
      if (status === 200) {
        mutate('/api/teams')
        mutate('/api/players')
        toast.success(message)
        return
      }
      toast.error('An ocurred a error')
      return
    })
  }

  return (
    <Dropdown className='bg-custom-darknavy text-custom-white'>
      <DropdownTrigger>
        <Button
          isLoading={isPending}
          isDisabled={activeTournament}
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
