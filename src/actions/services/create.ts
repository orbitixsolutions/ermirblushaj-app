'use server'

import { z } from 'zod'

import { getUserByEmail } from '@/data/user'
import { UserRole } from '@prisma/client'
import { currentRole } from '@/libs/auth'
import { Team } from '@prisma/client'
import { Player, TeamData } from '@/actions/types'
import { RegisterAdminSchema } from '@/schemas'
import { v4 as uuid } from 'uuid'
import prisma from '@/libs/prisma'
import bcrypt from 'bcryptjs'

export const createUser = async (data: z.infer<typeof RegisterAdminSchema>) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const validateFields = RegisterAdminSchema.safeParse(data)

    if (!validateFields.success) {
      return { error: 'Invalid fields!', status: 400 }
    }

    const { email, password, name, role } = data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return { error: 'Invalid fields!', status: 400 }
    }

    const emailLowerCase = email.toLowerCase()
    await prisma.user.create({
      data: {
        name,
        email: emailLowerCase,
        role: role as UserRole,
        password: hashedPassword,
      },
    })

    return { message: 'User created!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const createTeam = async (data: TeamData) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    await prisma.team.create({
      data: { name: data.name, id: data.id },
    })

    await prisma.teamStats.create({
      data: { teamId: data.id },
    })

    return { message: 'Team created!', status: 200 }
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
      EXIST_TEAM_ID,
    } = data

    const teamFoundName = await prisma.team.findUnique({
      where: { id: team_id },
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
        dateOfBirth: date_birthday,
      },
    })

    await prisma.playerStats.create({
      data: {
        teamId: teamId,
        playerId: id,
        lastName: last_name,
        firstName: first_name,
      },
    })
    return { message: 'Player created!', status: 200 }
  } catch (error: any) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const createImageTournamnet = async (data: any) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    await prisma.tournamentGallery.create({ data })

    return { message: 'Image created!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const createImageTribute = async (data: any) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    await prisma.tributeGallery.create({ data })

    return { message: 'Image created!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const createGroups = async (data: any) => {
  const role = await currentRole()

  const groups = data.groups
  const teams = data.teams

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const GROUP_LENGTH = await prisma.group.findMany()
    const ALREADY_GROUPS = GROUP_LENGTH.length === 6

    if (ALREADY_GROUPS)
      return { error: 'Already exists groups created!', status: 409 }

    await prisma.group.createMany({ data: groups })

    const transaction = teams.map((team: Team) => {
      return prisma.team.update({
        where: { id: team.id },
        data: { groupId: team.groupId },
      })
    })

    await prisma.$transaction(transaction)

    return { message: 'Groups created!', status: 200 }
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

    await prisma.match.create({ data: { teamAId, teamBId } })

    return { success: 'Matches created!', status: 200 }
  } catch (error: any) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const createKeys = async () => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const keys = await prisma.matchKey.findMany()
    const ALREADY_KEYS = keys.length === 8

    if (ALREADY_KEYS) {
      return { message: 'Already exists keys created!', status: 409 }
    }

    const groupsWithTopTeams = await prisma.group.findMany({
      include: {
        teams: {
          orderBy: { teamStats: { points: 'desc' } },
          take: 3,
        },
      },
    })

    const groupsWithThirdPlaceTeams = await prisma.group.findMany({
      include: {
        teams: {
          orderBy: { teamStats: { points: 'desc' } },
          skip: 2,
          take: 1,
        },
      },
    })

    const thirdPlaceTeams = groupsWithThirdPlaceTeams.map(
      (group) => group.teams[0]
    )

    const thirdPlaceGroup = [
      {
        id: crypto.randomUUID(),
        name: 'Third Place Group',
        teams: thirdPlaceTeams,
      },
    ]

    const combinedGroups = [...groupsWithTopTeams, ...thirdPlaceGroup]

    const [firstHalf, secondHalf] = [
      combinedGroups.slice(0, combinedGroups.length / 2),
      combinedGroups.slice(0, combinedGroups.length / 2),
    ]

    const matchesAB = createMatchups(firstHalf[0].teams, firstHalf[1].teams)
    const matchesCD = createMatchups(secondHalf[0].teams, secondHalf[1].teams)

    const aMatchKeys = matchesAB.slice(0, 2).flatMap((matches: any) =>
      matches.map((match: any, index: number) => {
        return {
          order: index + 1,
          column: 'A',
          teamAId: match.teamA.id,
          teamBId: match.teamB.id,
          phase: 'QUARTER',
        }
      })
    )

    const bMatchKeys = matchesCD.slice(0, 2).flatMap((matches: any) =>
      matches.map((match: any, index: number) => ({
        order: index + 1,
        column: 'B',
        teamAId: match.teamA.id,
        teamBId: match.teamB.id,
        phase: 'QUARTER',
      }))
    )

    const matchKeys = [...aMatchKeys, ...bMatchKeys]
    await prisma.matchKey.createMany({ data: matchKeys })

    return { message: 'Keys created!', status: 200 }
  } catch (error: any) {
    return { error: 'An error occurred while create keys.', status: 500 }
  }
}

const createMatchups = (teamA: Team[] | any, teamB: Team[] | any) => {
  const teams = teamA.map((aTeam: any, index: number) => [
    { teamA: aTeam, teamB: teamB[index] },
  ])

  return teams
}

export const finishMatchesEights = async () => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const matches = await prisma.matchKey.findMany({
      orderBy: { order: 'asc' },
    })

    const winnersId = matches.map((match) => match.winnerId)

    const matchups = [
      [winnersId[0], winnersId[1]],
      [winnersId[2], winnersId[3]],
      [winnersId[4], winnersId[5]],
      [winnersId[6], winnersId[7]],
    ]

    const matchCreation = matchups.map((matchup) => {
      return [{ teamAId: matchup[0] }, { teamBId: matchup[1] }]
    })

    const matchesQuartersA = matchCreation.slice(0, 2)
    const matchesQuartersB = matchCreation.slice(2, 4)

    const aMatchKeys = matchesQuartersA.map((match, index) => {
      const teamAId = match[0].teamAId
      const teamBId = match[1].teamBId

      return {
        id: uuid(),
        order: index + 1,
        column: 'A',
        phase: 'QUARTER',
        matchStatus: 'QUARTER',
        teamAId: teamAId,
        teamBId: teamBId,
      }
    })

    const bMatchKeys = matchesQuartersB.map((match, index) => {
      const teamAId = match[0].teamAId
      const teamBId = match[1].teamBId

      return {
        id: uuid(),
        order: index + 1,
        column: 'B',
        phase: 'QUARTER',
        matchStatus: 'QUARTER',
        teamAId: teamAId,
        teamBId: teamBId,
      }
    })

    const matchKeys: any = [...aMatchKeys, ...bMatchKeys]
    await prisma.matchKey.createMany({ data: matchKeys })

    return { message: 'Matches finished!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const finishMatchesQuarters = async () => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const blockA = await prisma.matchKey.findMany({
      include: { teamKeyA: true, teamKeyB: true },
      orderBy: { order: 'asc' },
      where: { column: 'A', phase: 'QUARTER' },
    })
    const blockB = await prisma.matchKey.findMany({
      include: { teamKeyA: true, teamKeyB: true },
      orderBy: { order: 'asc' },
      where: { column: 'B', phase: 'QUARTER' },
    })

    const matches = [...blockA, ...blockB]
    const winnersId = matches.map((match) => match.winnerId)

    const matchups = [
      [winnersId[0], winnersId[1]],
      [winnersId[2], winnersId[3]],
    ]

    const matchCreation = matchups.map((matchup) => {
      return [{ teamAId: matchup[0] }, { teamBId: matchup[1] }]
    })

    const matchesQuartersA = matchCreation.slice(0, 1)
    const matchesQuartersB = matchCreation.slice(1, 2)

    const aMatchKeys = matchesQuartersA.map((match, index) => {
      const teamAId = match[0].teamAId
      const teamBId = match[1].teamBId

      return {
        id: uuid(),
        order: index + 1,
        column: 'A',
        phase: 'SEMIFINALS',
        matchStatus: 'SEMIFINALS',
        teamAId: teamAId,
        teamBId: teamBId,
      }
    })

    const bMatchKeys = matchesQuartersB.map((match, index) => {
      const teamAId = match[0].teamAId
      const teamBId = match[1].teamBId

      return {
        id: uuid(),
        order: index + 1,
        column: 'B',
        phase: 'SEMIFINALS',
        matchStatus: 'SEMIFINALS',
        teamAId: teamAId,
        teamBId: teamBId,
      }
    })

    const matchKeys: any = [...aMatchKeys, ...bMatchKeys]
    await prisma.matchKey.createMany({ data: matchKeys })

    return { message: 'Matches finished!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const finishMatchesSemifinals = async () => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    const blockA = await prisma.matchKey.findMany({
      include: { teamKeyA: true, teamKeyB: true },
      orderBy: { order: 'asc' },
      where: { column: 'A', phase: 'SEMIFINALS' },
    })
    const blockB = await prisma.matchKey.findMany({
      include: { teamKeyA: true, teamKeyB: true },
      orderBy: { order: 'asc' },
      where: { column: 'B', phase: 'SEMIFINALS' },
    })

    const matches = [...blockA, ...blockB]
    const winnersId = matches.map((match) => match.winnerId)

    const matchups = [[winnersId[0], winnersId[1]]]

    const matchCreation = matchups.map((matchup) => {
      return [{ teamAId: matchup[0] }, { teamBId: matchup[1] }]
    })

    const finalMatchup = matchCreation.map((match, index) => {
      const teamIdA = match[0].teamAId
      const teamIdB = match[1].teamBId

      return {
        id: uuid(),
        order: index + 1,
        phase: 'FINAl',
        matchStatus: 'FINAL',
        teamAId: teamIdA,
        teamBId: teamIdB,
      }
    })

    await prisma.matchKey.create({
      data: {
        id: uuid(),
        column: 'NONE',
        phase: 'FINAL',
        matchStatus: 'FINAL',
        teamAId: finalMatchup[0].teamAId!,
        teamBId: finalMatchup[0].teamBId!,
      },
    })

    return { message: 'Matches finished!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}

export const finishMatchFinal = async () => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return { error: 'You no have permissions.', status: 501 }
  }

  try {
    // Finalizar torneo
    await prisma.matchKey.updateMany({
      data: {
        matchStatus: 'FINISHED',
      },
    })

    return { message: 'Matches finished!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error!', status: 500 }
  }
}
