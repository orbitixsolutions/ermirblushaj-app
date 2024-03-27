import { create } from 'zustand'

interface State {
  isActive: boolean
  id: string
  updateId: (id: string) => void
  updateIsActive: (state: boolean) => void
  disableIsActive: () => void
}

export const useIsActive = create<State>((set) => ({
  isActive: false,
  id: '',
  updateId: (id) =>
    set(() => ({
      id: id
    })),
  updateIsActive: (state) =>
    set(() => ({
      isActive: state
    })),
  disableIsActive: () =>
    set(() => ({
      isActive: false,
      id: ''
    }))
}))
