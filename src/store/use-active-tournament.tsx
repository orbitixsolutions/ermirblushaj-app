import { create } from 'zustand'

interface ActiveTournamentState {
  activeTournament: any
  setActiveTournament: (tournament: boolean) => void
}

export const useActiveTournament = create<ActiveTournamentState>((set) => ({
  activeTournament: null,
  setActiveTournament: (tournament) => set({ activeTournament: tournament })
}))
