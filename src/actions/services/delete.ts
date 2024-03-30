'use server'

import { deleteImage } from '@/helpers/delete-image'
import { currentRole } from '@/libs/auth'
import prisma from '@/libs/prisma'

export const deleteTeam = async (id: string) => {
  try {
    const teamsId = id

    const teams = await prisma.team.findUnique({
      where: {
        id: teamsId
      },
      include: {
        players: true
      }
    })
    await prisma.teamStats.delete({ where: { teamId: teamsId } })

    if (teams?.id === teamsId) {
      await deleteImage({ path: 'teams', id: teamsId })

      if (teams.players.length > 0) {
        for (const player of teams.players) {
          deleteImage({ path: 'players', id: player.id })
        }
        await prisma.player.deleteMany({ where: { teamId: teamsId } })
      }
    }

    await prisma.team.delete({ where: { id: teamsId } })
    return { success: 'Team deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error.', status: 500 }
  }
}

export const deletePlayer = async (id: string) => {
  try {
    const playerId = id

    await prisma.playerStats.delete({ where: { playerId: playerId } })
    await prisma.player.delete({ where: { id: playerId } })
    return { success: 'Player deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error.', status: 500 }
  }
}

export const deleteImageTournament = async (id: string) => {
  try {
    await prisma.tournamentGallery.delete({
      where: {
        id: id
      }
    })

    return { success: 'Image deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error.', status: 500 }
  }
}

export const deleteImageTribute = async (id: string) => {
  try {
    await prisma.tributeGallery.delete({
      where: {
        id: id
      }
    })

    return { success: 'Image deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error.', status: 500 }
  }
}

export const deleteAdmin = async (id: string) => {
  const role = await currentRole()

  if (role === 'ADMIN') {
    return { error: 'You no have permissions.', status: 500 }
  }

  try {
    const userId = id
    await prisma.user.delete({
      where: {
        id: userId
      }
    })

    return { success: 'User deleted!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error.', status: 500 }
  }
}
