'use server'

import { currentRole } from '@/libs/auth'
import { Group, Team, TournamentPhase } from '@prisma/client'
import { Player, TeamData } from '@/actions/types'
import prisma from '@/libs/prisma'
import { child } from 'firebase/database'

type ExtendedGroup = Group & {
  teams: TeamData[]
}

export const createTeam = async (data: TeamData) => {
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

export const createKeys = async () => {
  try {
    const keys = await prisma.matchKey.findMany()
    const ALREADY_KEYS = keys.length === 8

    if (ALREADY_KEYS) {
      return { message: 'Already exists keys created!', status: 409 }
    }

    const groups = await prisma.group.findMany({
      include: {
        teams: {
          orderBy: {
            teamStats: {
              points: 'desc'
            }
          },
          take: 4
        }
      }
    })

    const [firstHalf, secondHalf] = [
      groups.slice(0, groups.length / 2),
      groups.slice(groups.length / 2)
    ]

    const matchesAB = await generateMatchups(
      firstHalf[0].teams,
      firstHalf[1].teams
    )
    const matchesCD = await generateMatchups(
      secondHalf[0].teams,
      secondHalf[1].teams
    )

    const aMatchKeys = matchesAB.flatMap((matches: any) =>
      matches.map((match: any) => ({
        column: 'A',
        teamAId: match.teamA.id,
        teamBId: match.teamB.id
      }))
    )

    const bMatchKeys = matchesCD.flatMap((matches: any) =>
      matches.map((match: any) => ({
        column: 'B',
        teamAId: match.teamA.id,
        teamBId: match.teamB.id
      }))
    )

    const matchKeys = [...aMatchKeys, ...bMatchKeys]

    await prisma.matchKey.createMany({
      data: matchKeys
    })

    return { message: 'Keys created!', status: 200 }
  } catch {
    return { error: 'An error occurred while updating stats.', status: 500 }
  }
}

const generateMatchups = async (teamA: Team[] | any, teamB: Team[] | any) => {
  return teamA.map((aTeam: any, index: number) => [
    {
      teamA: aTeam,
      teamB: teamB[index]
    }
  ])
}

export const finishMatchesEights = async () => {
  try {
    const matches = await prisma.matchKey.findMany({
      orderBy: {
        order: 'asc'
      }
    })

    const winnersId = matches.map((match) => match.winnerId)

    const matchups = [
      [winnersId[0], winnersId[1]],
      [winnersId[2], winnersId[3]],
      [winnersId[4], winnersId[5]],
      [winnersId[6], winnersId[7]]
    ]

    const matchCreation = matchups.map((matchup) => {
      return [
        {
          teamAId: matchup[0]
        },
        {
          teamBId: matchup[1]
        }
      ]
    })

    const matchesQuartersA = matchCreation.slice(0, 2)
    const matchesQuartersB = matchCreation.slice(2, 4)

    const aMatchKeys = matchesQuartersA.map((match) => {
      const teamAId = match[0].teamAId
      const teamBId = match[1].teamBId

      return {
        column: 'A',
        phase: 'QUARTER',
        teamAId: teamAId,
        teamBId: teamBId
      }
    })

    const bMatchKeys = matchesQuartersB.map((match) => {
      const teamAId = match[0].teamAId
      const teamBId = match[1].teamBId

      return {
        column: 'B',
        phase: 'QUARTER',
        teamAId: teamAId,
        teamBId: teamBId
      }
    })

    const matchKeys: any = [...aMatchKeys, ...bMatchKeys]

    console.log(matchKeys)

    await prisma.matchKey.createMany({
      data: matchKeys
    })

    return { message: 'Matches finished!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}
