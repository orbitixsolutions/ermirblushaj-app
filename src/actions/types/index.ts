export interface Player {
  first_name: string
  last_name: string
  date_birthday: string
  number: string
  height: string
  nationality: string
  position: string
  team_id: string
  id: string
  EXIST_TEAM_NAME: string
  EXIST_TEAM_ID: string
}

export interface TeamData {
  name: string
  id: string
}

export interface ExtendedGroups {
  id: string
  name: string
  teams: Team[]
}

export interface ExtendedMatches {
  id: string
  teamAId: string
  teamBId: string
  status: string
  playStartDate: string
  playEndDate: null
  createdDate: Date
  teamA: Team
  teamB: Team
}

export interface Team {
  id: string
  groupId: string
  name: string
  logo: string
  createdDate: Date
  teamStats: TeamStats
  matchHistory: MatchHistory[]
}

export interface TeamStats {
  teamId: string
  currentGoals: number

  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number

  matchPlayed: number
  matchWin: number
  matchLoss: number
  matchDraw: number
}

export interface MatchHistory {
  id: string
  teamId: string
  result: string
  matchId: string
}
