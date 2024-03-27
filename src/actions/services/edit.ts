'use server'

import * as z from 'zod'

import { MatchesSchemas, PlayerSchema, TeamSchema } from '@/schemas'
import prisma from '@/libs/prisma'

export const editTeam = async (
  teamId: string,
  values: z.infer<typeof TeamSchema>
) => {
  try {
    const validateFields = TeamSchema.safeParse(values)
    if (!validateFields.success) {
      return { error: 'Fields invalid!' }
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
  teamId: string,
  values: z.infer<typeof PlayerSchema>
) => {
  try {
    const validateFields = PlayerSchema.safeParse(values)
    if (!validateFields.success) {
      return { error: 'Fields invalid!' }
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
        id: teamId
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

    return { success: 'Player edited!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const setDatePlay = async (
  matchesId: string,
  values: z.infer<typeof MatchesSchemas>
) => {
  try {
    const validateFields = MatchesSchemas.safeParse(values)
    if (!validateFields.success) {
      return { error: 'Fields invalid!' }
    }

    const { play_date } = validateFields.data

    await prisma.match.update({
      where: {
        id: matchesId
      },
      data: {
        playDate: play_date
      }
    })
    
    return { success: 'Chages saved!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}
