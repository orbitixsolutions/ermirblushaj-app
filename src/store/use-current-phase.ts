import { create } from 'zustand'

interface State {
  phase: string
}

interface Action {
  setPhase: (phase: string) => void
}

export const usePhase = create<State & Action>((set) => ({
  phase: 'QUARTERS',
  setPhase: (phase) => set({ phase: phase })
}))
