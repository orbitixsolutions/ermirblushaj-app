import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const teams = await prisma.team.findMany({
    orderBy: {
      createdDate: 'desc'
    },

  })
  return NextResponse.json(teams, { status: 200 })
}

export async function POST(request: Request) {
  const data = await request.json()

  const newTeams = await prisma.team.create({
    data: {
      name: data.name,
      id: data.id,
    }
  })

  return NextResponse.json(newTeams, { status: 200 })
}
