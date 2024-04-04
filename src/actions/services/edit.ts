'use server'

import * as z from 'zod'

import { MatchesSchemas, PlayerSchema, TeamSchema } from '@/schemas'
import { currentRole } from '@/libs/auth'
import { MatchStatus, Player } from '@prisma/client'
import prisma from '@/libs/prisma'

export const editTeam = async (
  teamId: string,
  values: z.infer<typeof TeamSchema>
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const validateFields = TeamSchema.safeParse(values)
    if (!validateFields.success) {
      return { error: 'Fields invalid!', status: 409 }
    }

    const { name } = validateFields.data

    await prisma.team.update({
      where: {
        id: teamId
      },
      data: {
        name: name
      }
    })

    await prisma.player.updateMany({
      where: {
        teamId: teamId
      },
      data: {
        teamName: name
      }
    })

    return { success: 'Team edited!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error.', status: 500 }
  }
}

export const editPlayer = async (
  playerId: string,
  values: z.infer<typeof PlayerSchema>
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const validateFields = PlayerSchema.safeParse(values)
    if (!validateFields.success) {
      return { error: 'Fields invalid!', status: 409 }
    }

    const {
      first_name,
      date_birthday,
      height,
      last_name,
      nationality,
      number,
      position,
      team_id
    } = validateFields.data

    const teamFoundName = await prisma.team.findUnique({
      where: {
        id: team_id
      }
    })

    await prisma.player.update({
      where: {
        id: playerId
      },
      data: {
        firstName: first_name,
        lastName: last_name,
        dateOfBirth: date_birthday,
        number: number,
        height: height,
        nationality: nationality,
        position: position,
        teamId: team_id,
        teamName: teamFoundName?.name
      }
    })

    await prisma.playerStats.update({
      where: {
        playerId: playerId
      },
      data: {
        firstName: first_name,
        lastName: last_name
      }
    })

    return { success: 'Player edited!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const setDatePlay = async (
  matchesId: string,
  values: z.infer<typeof MatchesSchemas>
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const validateFields = MatchesSchemas.safeParse(values)
    if (!validateFields.success) {
      return { error: 'Fields invalid!' }
    }

    const { play_start_date } = validateFields.data

    await prisma.match.update({
      where: {
        id: matchesId
      },
      data: {
        playStartDate: play_start_date
      }
    })

    return { success: 'Chages saved!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const updateStatusMatches = async (matchesId: string, value: string) => {
  try {
    await prisma.match.update({
      where: {
        id: matchesId
      },
      data: {
        status: value as MatchStatus
      }
    })

    return { success: 'Status updated!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const updatedStats = async (data: Player) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const playerId = data.id
    const teamId = data.teamId

    await prisma.playerStats.update({
      where: { playerId: playerId },
      data: { goals: { increment: 1 } }
    })

    await prisma.teamStats.update({
      where: { teamId: teamId },
      data: {
        goalsFor: { increment: 1 }
      }
    })
    return { success: 'Status updated!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}
