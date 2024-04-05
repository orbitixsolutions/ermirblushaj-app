'use server'

import { deleteImage } from '@/helpers/delete-image'
import { currentRole } from '@/libs/auth'
import prisma from '@/libs/prisma'

// -------------------------------- //
// DELETE TEAMS //
// -------------------------------- //
export const deleteTeam = async (id: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 500 }
  }

  try {
    const teamId = id

    const players = await prisma.player.findMany({ where: { teamId: teamId } })
    players.map((player) => deleteImage({ path: 'players', id: player.id }))

    await prisma.$transaction([
      prisma.match.deleteMany({
        where: { OR: [{ teamAId: teamId }, { teamBId: teamId }] }
      }),
      prisma.playerStats.deleteMany({ where: { teamId: teamId } }),
      prisma.player.deleteMany({ where: { teamId: teamId } }),
      prisma.teamStats.deleteMany({ where: { teamId: teamId } }),
      prisma.team.delete({ where: { id: teamId } })
    ])

    return { success: 'Team deleted!', status: 200 }
  } catch (error: any) {
    console.log(error)
    return { error: 'An ocurred a error!', status: 500 }
  }
}

// -------------------------------- //
// DELETE PLAYERS //
// -------------------------------- //
export const deletePlayer = async (playerId: string, teamId: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 500 }
  }

  try {
    await prisma.playerStats.delete({ where: { playerId: playerId } })
    await prisma.player.delete({ where: { id: playerId } })

    await prisma.teamStats.update({
      where: {
        teamId
      },
      data: {
        goalsFor: 0,
        goalDifference: 0,
        goalsAgainst: 0,
        points: 0
      }
    })

    return { success: 'Player deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

// -------------------------------- //
// DELETE IMAGES TOURNAMENT //
// -------------------------------- //
export const deleteImageTournament = async (id: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 500 }
  }

  try {
    await prisma.tournamentGallery.delete({
      where: {
        id
      }
    })

    return { success: 'Image deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

// -------------------------------- //
// DELETE IMAGES TRIBUTE //
// -------------------------------- //
export const deleteImageTribute = async (id: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 500 }
  }

  try {
    await prisma.tributeGallery.delete({
      where: {
        id
      }
    })

    return { success: 'Image deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

// -------------------------------- //
// DELETE ADMIN USERS //
// -------------------------------- //
export const deleteAdmin = async (id: string) => {
  const role = await currentRole()

  if (role === 'ADMIN') {
    return { error: 'You no have permissions.', status: 500 }
  }

  try {
    await prisma.user.delete({
      where: {
        id
      }
    })

    return { success: 'User deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

// -------------------------------- //
// RESET TEAM STATS //
// -------------------------------- //
export const resetTeamStats = async () => {
  try {
    await prisma.teamStats.updateMany({
      data: {
        goalsFor: 0,
        goalDifference: 0,
        goalsAgainst: 0,
        points: 0
      }
    })

    return { success: 'Team stats reseted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

// -------------------------------- //
// RESET PLAYER STATS //
// -------------------------------- //
export const resetPlayerStats = async () => {
  try {
    await prisma.playerStats.updateMany({
      data: {
        goals: 0
      }
    })

    return { success: 'Players stats reseted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

// -------------------------------- //
// DELETE GROUPS //
// -------------------------------- //
export const deleteGroups = async () => {
  try {
    await prisma.matchHistory.deleteMany()
    await prisma.group.deleteMany()
    return { success: 'Groups deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

// -------------------------------- //
// DELETE MATCHES //
// -------------------------------- //
export const deleteMatches = async () => {
  try {
    await prisma.matchHistory.deleteMany()
    await prisma.match.deleteMany()
    return { success: 'Matches deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const resetAllStats = async () => {
  try {
    await prisma.$transaction([
      prisma.teamStats.updateMany({
        data: {
          points: 0,
          goalsFor: 0,
          goalDifference: 0,
          goalsAgainst: 0,
          currentGoals: 0,
          matchDraw: 0,
          matchLoss: 0,
          matchPlayed: 0,
          matchWin: 0
        }
      }),
      prisma.playerStats.updateMany({
        data: {
          goals: 0
        }
      }),
      prisma.match.updateMany({
        data: {
          playEndDate: null,
          status: 'PENDING'
        }
      }),
      prisma.matchHistory.deleteMany()
    ])

    return { success: 'All stats reseted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}
