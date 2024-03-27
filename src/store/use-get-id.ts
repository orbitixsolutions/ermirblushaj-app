import { create } from 'zustand'

interface State {
  getId: string
}

interface Action {
  updatedGetId: (id: string) => void
  resetId: () => void
}

export const useGetId = create<State & Action>((set) => ({
  getId: '',
  updatedGetId: (id) => set({ getId: id }),
  resetId: () => set({ getId: '' })
}))
