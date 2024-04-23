'use server'

import * as z from 'zod'

import { MatchesSchemas, PlayerSchema, TeamSchema } from '@/schemas'
import { currentRole } from '@/libs/auth'
import { Match, MatchStatus, Player } from '@prisma/client'
import { ExtendedMatches } from '@/actions/types'
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
        goalsFor: { increment: 1 },
        currentGoals: { increment: 1 }
      }
    })
    return { success: 'Status updated!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const updatedFinishStats = async (data: Match) => {
  const { teamA, teamB, teamAId, teamBId, id } = data as ExtendedMatches

  try {
    const goalsTeamA = teamA.teamStats.currentGoals
    const goalsTeamB = teamB.teamStats.currentGoals

    const goalsForTeamA = teamA.teamStats.goalsFor
    const goalsForTeamB = teamB.teamStats.goalsFor

    let resultTeamA, resultTeamB

    // Determinar el resultado del partido
    if (goalsTeamA === goalsTeamB) {
      resultTeamA = 'DRAW'
      resultTeamB = 'DRAW'
    } else {
      resultTeamA = goalsTeamA > goalsTeamB ? 'WIN' : 'LOSS'
      resultTeamB = goalsTeamB > goalsTeamA ? 'WIN' : 'LOSS'
    }

    // Determina los puntos basados en el resultado
    const pointsTeamA =
      resultTeamA === 'WIN' ? 3 : resultTeamA === 'DRAW' ? 1 : 0
    const pointsTeamB =
      resultTeamB === 'WIN' ? 3 : resultTeamB === 'DRAW' ? 1 : 0

    const operations = []

    operations.push(
      prisma.teamStats.update({
        where: { teamId: teamAId },
        data: {
          goalsAgainst: { increment: goalsForTeamB },
          goalDifference: goalsForTeamA - goalsForTeamB,
          points: { increment: pointsTeamA },
          currentGoals: 0
        }
      }),
      prisma.teamStats.update({
        where: { teamId: teamBId },
        data: {
          goalsAgainst: { increment: goalsForTeamA },
          goalDifference: goalsForTeamA - goalsForTeamA,
          points: { increment: pointsTeamB },
          currentGoals: 0
        }
      })
    )

    operations.push(
      prisma.matchHistory.createMany({
        data: [
          { result: resultTeamA, matchId: id, teamId: teamAId },
          { result: resultTeamB, matchId: id, teamId: teamBId }
        ]
      })
    )

    updateTeamStats(teamAId, resultTeamA, operations)
    updateTeamStats(teamBId, resultTeamB, operations)

    operations.push(
      prisma.match.update({
        where: { id },
        data: {
          playEndDate: new Date() + '',
          status: 'COMPLETED'
        }
      })
    )

    await prisma.$transaction(operations)

    return { success: 'Match stats successfully updated!', status: 200 }
  } catch (error) {
    console.error(error)
    return { error: 'An occurred error while updating stats!', status: 500 }
  }
}

const updateTeamStats = (teamId: string, result: string, operations: any[]) => {
  let updateData: any = {
    matchPlayed: { increment: 1 }
  }

  if (result === 'WIN') {
    updateData.matchWin = { increment: 1 }
  } else if (result === 'DRAW') {
    updateData.matchDraw = { increment: 1 }
  } else if (result === 'LOSS') {
    updateData.matchLoss = { increment: 1 }
  }

  operations.push(
    prisma.teamStats.update({
      where: { teamId: teamId },
      data: updateData
    })
  )
}

export const updatedGroupsFase = async () => {
  try {
    await prisma.match.updateMany({
      data: {
        status: 'COMPLETED'
      }
    })

    return { message: 'Group stage over!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error while updating stats!', status: 500 }
  }
}

export const updatedMatchKeyDate = async (matchId: string, date: string) => {
  try {
    await prisma.matchKey.update({
      where: {
        id: matchId
      },
      data: {
        playStartDate: date,
        status: 'LIVE'
      }
    })

    return { message: 'Match key date updated!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error while updating stats!', status: 500 }
  }
}

export const updatedMatchKeyStatus = async (
  matchId: string,
  status: string
) => {
  try {
    await prisma.matchKey.update({
      where: {
        id: matchId
      },
      data: {
        status: status as MatchStatus
      }
    })

    return { message: 'Match key date updated!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error while updating stats!', status: 500 }
  }
}
