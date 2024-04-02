import { create } from 'zustand'

interface TodayGameState {
  isToday: boolean
  gameId: string
  updatedTodayGame: (value: boolean) => void
  updatedGameId: (value: string) => void
}

export const useTodayGameStore = create<TodayGameState>((set) => ({
  isToday: false,
  gameId: '',
  updatedTodayGame: (value) => set(() => ({ isToday: value })),
  updatedGameId: (value) => set(() => ({ gameId: value })),
}))
