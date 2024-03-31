import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(request: Request) {
  const groups = await prisma.group.findMany({
    include: {
      teams: true
    },
    orderBy: {
      name: 'asc'
    }
  })
  return NextResponse.json(groups, { status: 200 })
}

export async function POST(request: Request) {
  const data = await request.json()

  const groups = await prisma.group.findMany()
  const ALREADY_GROUPS = groups.length === 4

  if (ALREADY_GROUPS)
    return NextResponse.json(
      { error: 'Already exists groups created!' },
      { status: 409 }
    )

  const newGroups = await prisma.group.create({
    data: {
      name: data.groupName,
      teams: {
        connect: data.teams
      }
    }
  })

  return NextResponse.json(newGroups, { status: 200 })
}

export async function PUT(request: Request) {
  const data = await request.json()

  const playerId = data.playerId
  const teamId = data.teamId

  await prisma.playerStats.update({
    where: { playerId: playerId },
    data: { goals: { increment: 1 } }
  })

  const teamStats = await prisma.teamStats.update({
    where: { teamId: teamId },
    data: {
      goalsFor: { increment: 1 }
    }
  })

  return NextResponse.json(teamStats, { status: 200 })
}
