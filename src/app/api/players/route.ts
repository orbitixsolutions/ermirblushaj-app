import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const players = await prisma.player.findMany({
    orderBy: {
      createdDate: 'desc'
    }
  })
  return NextResponse.json(players, { status: 200 })
}

export async function POST(request: Request) {
  const data = await request.json()

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

  const newPlayer = await prisma.player.create({
    data: {
      firstName: first_name,
      lastName: last_name,
      dateOfBirth: date_birthday,
      number: number,
      height: height,
      nationality: nationality,
      position: position,
      teamId: team_id === '' ? EXIST_TEAM_ID : team_id,
      teamName: teamFoundName?.name ?? EXIST_TEAM_NAME,
      id: id
    }
  })

  await prisma.playerStats.create({
    data: {
      playerId: id,
      teamId: team_id === '' ? EXIST_TEAM_ID : team_id
    }
  })

  return NextResponse.json(newPlayer, { status: 200 })
}
