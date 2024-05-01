'use client'

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection
} from '@nextui-org/react'
import { IconEdit, IconSettings, IconTrash } from '@tabler/icons-react'
import { Player } from '@prisma/client'
import { useModalPlayerStore } from '@/store/modal/use-modal-player-store'
import { deletePlayer } from '@/actions/services/delete'
import { toast } from 'sonner'
import { deleteImage } from '@/helpers/delete-image'
import { useTransition } from 'react'
import { mutate } from 'swr'
import { useActiveTournament } from '@/store/use-active-tournament'

interface Props {
  player: Player
}

const DropdownPlayer = ({ player }: Props) => {
  const [isPending, startTransition] = useTransition()

  const activeTournament = useActiveTournament(
    (state) => state.activeTournament
  )

  const { onPlayerModalEdit } = useModalPlayerStore((state) => ({
    onPlayerModalEdit: state.onPlayerModalEdit
  }))

  const handleEditMode = (id: string) => {
    onPlayerModalEdit(id)
  }

  const handlePlayerDeleted = async (playerId: string, teamId: string) => {
    startTransition(async () => {
      await deleteImage({ path: 'players', id: playerId })

      const { status, message } = await deletePlayer(playerId, teamId)
      if (status === 200) {
        mutate('/api/players')
        toast.success(message)
        return
      }

      toast.error('An ocurred a error')
      return
    })
  }

  return (
    <>
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
              key='edit'
              color='primary'
              onPress={() => handleEditMode(player.id)}
              startContent={<IconEdit size={24} />}
            >
              Edit player
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title='Danger' showDivider>
            <DropdownItem
              key='delete'
              color='danger'
              onPress={() => handlePlayerDeleted(player.id, player.teamId)}
              className='text-danger'
              startContent={<IconTrash size={24} />}
            >
              Delete player
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default DropdownPlayer
