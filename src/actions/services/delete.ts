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
    const teams = await prisma.team.findUnique({
      where: {
        id
      },
      include: {
        players: true
      }
    })
    await prisma.teamStats.delete({ where: { teamId: id } })

    if (teams?.id === id) {
      await deleteImage({ path: 'teams', id: id })

      if (teams.players.length > 0) {
        for (const player of teams.players) {
          deleteImage({ path: 'players', id: player.id })
          await prisma.playerStats.delete({ where: { playerId: player.id } })
        }
        await prisma.player.deleteMany({ where: { teamId: id } })
      }
    }

    await prisma.team.delete({ where: { id: id } })
    return { success: 'Team deleted!', status: 200 }
  } catch (error) {
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
export const resetTeamStats = async (teamId: string) => {
  try {
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

    return { success: 'Team stats reseted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

// -------------------------------- //
// RESET PLAYER STATS //
// -------------------------------- //
export const resetPlayerStats = async (playerId: string) => {
  try {
    await prisma.playerStats.update({
      where: {
        playerId
      },
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
export const deleteGroups = async (id: string) => {
  try {
    await prisma.group.delete({
      where: {
        id
      }
    })

    return { success: 'Groups deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

// -------------------------------- //
// DELETE MATCHES //
// -------------------------------- //
export const deleteMatches = async (id: string) => {
  try {
    await prisma.match.delete({
      where: {
        id
      }
    })

    return { success: 'Matches deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}
