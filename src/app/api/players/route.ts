import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const players = await prisma.player.findMany({
    orderBy: {
      createdDate: 'desc'
    },

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
    is_team_name,
    is_team_id
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
      teamId: team_id === '' ? is_team_id : team_id,
      teamName: teamFoundName?.name ?? is_team_name,
      id: id
    }
  })
  return NextResponse.json(newPlayer, { status: 200 })
}
