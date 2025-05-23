'use server'

import * as z from 'zod'

import { PlayerSchema, TeamSchema } from '@/schemas'
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

    return { message: 'Player edited!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const setDatePlay = async (matchesId: string, date: any) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    await prisma.match.update({
      where: {
        id: matchesId
      },
      data: {
        status: 'LIVE',
        playStartDate: date
      }
    })

    return { message: 'Chages saved!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const updateStatusMatches = async (matchesId: string, value: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

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
        currentGoals: { increment: 1 },
        matchPlayed: { increment: 1 },
        teamGoalsCount: { increment: 1 }
      }
    })
    return { success: 'Status updated!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const updatedFinishStats = async (data: Match) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

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
          matchWin: resultTeamA === 'WIN' ? { increment: 1 } : 0,
          matchDraw: resultTeamA === 'DRAW' ? { increment: 1 } : 0,
          matchLoss: resultTeamA === 'LOSS' ? { increment: 1 } : 0,
          points: { increment: pointsTeamA },
          currentGoals: 0,
          teamGoalsCount: 0
        }
      }),
      prisma.teamStats.update({
        where: { teamId: teamBId },
        data: {
          goalsAgainst: { increment: goalsForTeamA },
          goalDifference: goalsForTeamA - goalsForTeamA,
          matchWin: resultTeamA === 'WIN' ? { increment: 1 } : 0,
          matchDraw: resultTeamA === 'DRAW' ? { increment: 1 } : 0,
          matchLoss: resultTeamA === 'LOSS' ? { increment: 1 } : 0,
          points: { increment: pointsTeamB },
          currentGoals: 0,
          teamGoalsCount: 0
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

const updateTeamStats = async (
  teamId: string,
  result: string,
  operations: any[]
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

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
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

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
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

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
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

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

export const selectWinnerEights = async (
  matchId: string,
  teamWinnerId: string
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    await prisma.team.update({
      where: {
        id: teamWinnerId
      },
      data: {
        phase: 'QUARTER'
      }
    })

    const match = await prisma.matchKey.findUnique({
      where: {
        id: matchId
      },
      include: {
        teamKeyA: true,
        teamKeyB: true
      }
    })

    const teamA = match?.teamKeyA
    const teamB = match?.teamKeyB

    let winnerId
    let loserId

    if (teamA?.phase === 'QUARTER') {
      winnerId = teamA?.id
      loserId = teamB?.id
    }
    if (teamB?.phase === 'QUARTER') {
      winnerId = teamB?.id
      loserId = teamA?.id
    }

    // Verificar si el equipo perdedor ya fue eliminado
    const isEliminated = await prisma.team.count({
      where: {
        isEliminated: true
      }
    })

    // Actualizar el equipo ganador
    await prisma.team.update({
      where: {
        id: winnerId
      },
      data: {
        stageStatus: 'WINNER'
      }
    })

    // Actualizar el equipo perdedor
    await prisma.team.update({
      where: {
        id: loserId
      },
      data: {
        isEliminated: true,
        position: isEliminated + 1,
        stageStatus: 'LOSER',
        phase: 'EIGHTH'
      }
    })

    // Actualizar el partido con el equipo perdedor y ganador
    await prisma.matchKey.update({
      where: {
        id: matchId
      },
      data: {
        loserId: loserId,
        winnerId: winnerId
      }
    })

    // Finalizar el partido
    await prisma.matchKey.update({
      where: {
        id: matchId
      },
      data: {
        status: 'COMPLETED'
      }
    })

    return { status: 200, message: 'Winner selected!' }
  } catch (error) {
    return { error: 'An occurred error while updating stats!', status: 500 }
  }
}

export const selectQuartersWinners = async (
  matchId: string,
  teamWinnerId: string
) => {
  try {
    const role = await currentRole()

    if (role !== 'ADMIN' && role !== 'OWNER') {
      return { error: 'You no have permissions.', status: 501 }
    }

    const winnerTeam = await prisma.team.findUnique({
      where: {
        id: teamWinnerId
      }
    })

    // Si el equipo ganador es de cuartos de final
    if (winnerTeam?.phase === 'NONE') {
      await prisma.team.update({
        where: {
          id: teamWinnerId
        },
        data: {
          phase: 'SEMIFINALS'
        }
      })

      const match = await prisma.matchKey.findUnique({
        where: {
          id: matchId
        },
        include: {
          teamKeyA: true,
          teamKeyB: true
        }
      })

      const teamA = match?.teamKeyA
      const teamB = match?.teamKeyB

      let winnerId
      let loserId

      if (teamA?.phase === 'SEMIFINALS') {
        winnerId = teamA?.id
        loserId = teamB?.id
      }
      if (teamB?.phase === 'SEMIFINALS') {
        winnerId = teamB?.id
        loserId = teamA?.id
      }

      // Actualizar el partido con el equipo perdedor y ganador
      await prisma.matchKey.update({
        where: {
          id: matchId
        },
        data: {
          loserId: loserId,
          winnerId: winnerId
        }
      })

      // Verificar si el equipo perdedor ya fue eliminado
      const isEliminated = await prisma.team.count({
        where: {
          isEliminated: true
        }
      })

      // Actualizar el equipo ganador
      await prisma.team.update({
        where: {
          id: winnerId
        },
        data: {
          stageStatus: 'WINNER'
        }
      })

      // Actualizar el equipo perdedor
      await prisma.team.update({
        where: {
          id: loserId
        },
        data: {
          isEliminated: true,
          stageStatus: 'LOSER',
          position: isEliminated + 1,
          phase: 'QUARTER'
        }
      })

      // Finalizar el partido
      await prisma.matchKey.update({
        where: {
          id: matchId
        },
        data: {
          status: 'COMPLETED'
        }
      })
    }

    return { status: 200, message: 'Winner selected!' }
  } catch (error) {
    return { error: 'An occurred error while updating stats!', status: 500 }
  }
}

export const selectSemifinalsWinners = async (
  matchId: string,
  teamWinnerId: string
) => {
  try {
    const role = await currentRole()

    if (role !== 'ADMIN' && role !== 'OWNER') {
      return { error: 'You no have permissions.', status: 501 }
    }

    const winnerTeam = await prisma.team.findUnique({
      where: {
        id: teamWinnerId
      }
    })

    // Si el equipo ganador es de cuartos de final
    if (winnerTeam?.phase === 'FINAL' || winnerTeam?.phase === 'SEMIFINALS') {
      await prisma.team.update({
        where: {
          id: teamWinnerId
        },
        data: {
          phase: 'FINAL'
        }
      })

      const match = await prisma.matchKey.findUnique({
        where: {
          id: matchId
        },
        include: {
          teamKeyA: true,
          teamKeyB: true
        }
      })

      const teamA = match?.teamKeyA
      const teamB = match?.teamKeyB

      let winnerId
      let loserId

      if (teamA?.phase === 'FINAL') {
        winnerId = teamA?.id
        loserId = teamB?.id
      }
      if (teamB?.phase === 'FINAL') {
        winnerId = teamB?.id
        loserId = teamA?.id
      }

      // Verificar si el equipo perdedor ya fue eliminado
      const isEliminated = await prisma.team.count({
        where: {
          isEliminated: true
        }
      })

      // Actualizar el equipo ganador
      await prisma.team.update({
        where: {
          id: winnerId
        },
        data: {
          stageStatus: 'WINNER'
        }
      })

      // Actualizar el equipo perdedor
      await prisma.team.update({
        where: {
          id: loserId
        },
        data: {
          isEliminated: true,
          stageStatus: 'LOSER',
          position: isEliminated + 1,
          phase: 'SEMIFINALS'
        }
      })

      // Actualizar el partido con el equipo perdedor y ganador
      await prisma.matchKey.update({
        where: {
          id: matchId
        },
        data: {
          loserId: loserId,
          winnerId: winnerId
        }
      })

      // Finalizar el partido
      await prisma.matchKey.update({
        where: {
          id: matchId
        },
        data: {
          status: 'COMPLETED',
          matchStatus: 'FINAL'
        }
      })
    }

    return { status: 200, message: 'Winner selected!' }
  } catch (error) {
    return { error: 'An occurred error while updating stats!', status: 500 }
  }
}

export const selectFinalWinner = async (
  matchId: string,
  teamWinnerId: string
) => {
  try {
    const role = await currentRole()

    if (role !== 'ADMIN' && role !== 'OWNER') {
      return { error: 'You no have permissions.', status: 501 }
    }

    const winnerTeam = await prisma.team.findUnique({
      where: {
        id: teamWinnerId
      }
    })

    // Si el equipo ganador es de cuartos de final
    if (winnerTeam?.phase === 'FINAL') {
      await prisma.team.update({
        where: {
          id: teamWinnerId
        },
        data: {
          phase: 'FINAL'
        }
      })

      const match = await prisma.matchKey.findUnique({
        where: {
          id: matchId
        },
        include: {
          teamKeyA: true,
          teamKeyB: true
        }
      })

      const teamA = match?.teamKeyA
      const teamB = match?.teamKeyB

      let winnerId
      let loserId

      if (teamA?.phase === 'FINAL') {
        winnerId = teamA?.id
        loserId = teamB?.id
      }
      if (teamB?.phase === 'FINAL') {
        winnerId = teamB?.id
        loserId = teamA?.id
      }

      // Verificar si el equipo perdedor ya fue eliminado
      const isEliminated = await prisma.team.count({
        where: {
          isEliminated: true
        }
      })

      // Actualizar el equipo ganador
      await prisma.team.update({
        where: {
          id: winnerId
        },
        data: {
          position: isEliminated + 2,
          stageStatus: 'WINNER'
        }
      })

      // Actualizar el equipo perdedor
      await prisma.team.update({
        where: {
          id: loserId
        },
        data: {
          isEliminated: true,
          stageStatus: 'LOSER',
          position: isEliminated + 1,
          phase: 'SEMIFINALS'
        }
      })

      // Actualizar el partido con el equipo perdedor y ganador
      await prisma.matchKey.update({
        where: {
          id: matchId
        },
        data: {
          loserId: loserId,
          winnerId: winnerId
        }
      })

      // Finalizar el partido
      await prisma.matchKey.update({
        where: {
          id: matchId
        },
        data: {
          status: 'COMPLETED'
        }
      })
    }

    return { status: 200, message: 'Winner selected!' }
  } catch (error) {
    return { error: 'An occurred error while updating stats!', status: 500 }
  }
}
