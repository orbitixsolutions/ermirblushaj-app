import { create } from 'zustand'

interface ModalTeam {
  teamModalOpen: boolean
  teamModalEdit: boolean
  teamModalId: string
}

interface ModalActions {
  onTeamModalOpen: () => void
  onTeamModalOpenId: (id: string) => void
  onTeamModalEdit: (id: string) => void
  onTeamModalClose: () => void
}

export const useModalTeamStore = create<ModalTeam & ModalActions>((set) => ({
  teamModalOpen: false,
  teamModalEdit: false,
  teamModalId: '',

  onTeamModalOpen: () =>
    set({
      teamModalOpen: true
    }),
  onTeamModalOpenId: (id) =>
    set({
      teamModalOpen: true,
      teamModalId: id
    }),
  onTeamModalEdit: (id) =>
    set({
      teamModalOpen: true,
      teamModalEdit: true,
      teamModalId: id
    }),
  onTeamModalClose: () =>
    set({
      teamModalOpen: false,
      teamModalEdit: false,
      teamModalId: ''
    })
}))
