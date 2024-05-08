'use server'

import prisma from '@/libs/prisma'

export const dataTeams = async () => {
  try {
    const teams = await prisma.team.findMany()
    return { data: teams, message: 'Data loaded!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error!', status: 500 }
  }
}

export const dataPlayers = async () => {
  try {
    const players = await prisma.player.findMany()
    return { data: players, message: 'Data loaded!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error!', status: 500 }
  }
}

export const dataPlayersById = async (playerId: string) => {
  try {
    const players = await prisma.player.findUnique({
      where: {
        id: playerId
      }
    })
    return { data: players, message: 'Data loaded!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error!', status: 500 }
  }
}

export const dataTeamById = async (teamId: string) => {
  try {
    const teams = await prisma.team.findUnique({
      where: {
        id: teamId
      },
      include: {
        players: true,
        playerStats: true,
        teamStats: true
      }
    })
    return { data: teams, message: 'Data loaded!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error!', status: 500 }
  }
}

export const dataMatchesKeys = async () => {
  try {
    const matches = await prisma.matchKey.findMany({
      include: {
        teamKeyA: true,
        teamKeyB: true,
        matchKeyHistory: true
      }
    })

    return { data: matches, message: 'Data loaded!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error!', status: 500 }
  }
}

export const dataMatchesById = async (matchId: string) => {
  try {
    const matches = await prisma.match.findUnique({
      where: {
        id: matchId
      },
      include: {
        teamA: true,
        teamB: true,
        matchHistory: true
      }
    })

    return { data: matches, message: 'Data loaded!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error!', status: 500 }
  }
}

export const dataMatchesKeysById = async (matchKeyId: string) => {
  try {
    const matches = await prisma.matchKey.findUnique({
      where: {
        id: matchKeyId
      },
      include: {
        teamKeyA: true,
        teamKeyB: true,
        matchKeyHistory: true
      }
    })

    return { data: matches, message: 'Data loaded!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error!', status: 500 }
  }
}
