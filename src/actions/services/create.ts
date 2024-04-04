'use server'

import { currentRole } from '@/libs/auth'
import { Group } from '@prisma/client'
import { Player, Team } from '@/actions/types'
import prisma from '@/libs/prisma'

type ExtendedGroup = Group & {
  teams: Team[]
}

export const createTeam = async (data: Team) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    await prisma.team.create({
      data: {
        name: data.name,
        id: data.id
      }
    })

    await prisma.teamStats.create({
      data: {
        teamId: data.id
      }
    })

    return { success: 'Team created!', status: 200 }
  } catch (error: any) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const createPlayers = async (data: Player) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const {
      first_name,
      last_name,
      date_birthday,
      number,
      height,
      nationality,
      position,
      team_id,
      id,
      EXIST_TEAM_NAME,
      EXIST_TEAM_ID
    } = data

    const teamFoundName = await prisma.team.findUnique({
      where: {
        id: team_id
      }
    })

    const teamId = team_id === '' ? EXIST_TEAM_ID : team_id
    const teamName = teamFoundName?.name ?? EXIST_TEAM_NAME

    await prisma.player.create({
      data: {
        teamName: teamName,
        teamId: teamId,
        position: position,
        number: number,
        nationality: nationality,
        lastName: last_name,
        id: id,
        height: height,
        firstName: first_name,
        dateOfBirth: date_birthday
      }
    })

    await prisma.playerStats.create({
      data: {
        teamId: teamId,
        playerId: id,
        lastName: last_name,
        firstName: first_name
      }
    })
    return { success: 'Player created!', status: 200 }
  } catch (error: any) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const createGroups = async (data: ExtendedGroup) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const groups = await prisma.group.findMany()
    const ALREADY_GROUPS = groups.length === 4

    if (ALREADY_GROUPS)
      return { error: 'Already exists groups created!', status: 409 }

    await prisma.group.create({
      data: {
        name: data.name,
        teams: {
          connect: data.teams
        }
      }
    })

    return { success: 'Groups created!', status: 200 }
  } catch (error: any) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const createMatches = async (teamAId: string, teamBId: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const matches = await prisma.match.findMany()
    const ALREADY_MATCHES = matches.length === 40

    if (ALREADY_MATCHES)
      return { error: 'Already exists matchups created!', status: 409 }

    await prisma.match.create({
      data: {
        teamAId,
        teamBId
      }
    })

    return { success: 'Matches created!', status: 200 }
  } catch (error: any) {
    console.log(error)
    return { error: 'An ocurred a error!', status: 500 }
  }
}
