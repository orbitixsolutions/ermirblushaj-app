import { Team } from '@prisma/client'
import { create } from 'zustand'

interface ModalPlayer {
  playerModalOpen: boolean
  playerModalEdit: boolean
  playerModalId: string
  playerModalData: {
    name: string
    logo: string | null
    id: string
  }
}

interface ModalActions {
  onPlayerModalOpen: () => void
  onPlayerModalOpenId: (team: Team) => void
  onPlayerModalEdit: (id: string) => void
  onPlayerModalClose: () => void
}

export const useModalPlayerStore = create<ModalPlayer & ModalActions>(
  (set) => ({
    playerModalOpen: false,
    playerModalEdit: false,
    playerModalId: '',
    playerModalData: {
      name: '',
      logo: '',
      id: ''
    },

    onPlayerModalOpen: () =>
      set({
        playerModalOpen: true
      }),
    onPlayerModalOpenId: (team) =>
      set({
        playerModalOpen: true,
        playerModalData: {
          name: team.name,
          logo: team.logo,
          id: team.id
        }
      }),
    onPlayerModalEdit: (id) =>
      set({
        playerModalOpen: true,
        playerModalEdit: true,
        playerModalId: id
      }),
    onPlayerModalClose: () =>
      set({
        playerModalOpen: false,
        playerModalEdit: false,
        playerModalId: '',
        playerModalData: {
          name: '',
          logo: '',
          id: ''
        }
      })
  })
)
