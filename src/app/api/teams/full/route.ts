import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(request: Request) {
  const teams = await prisma.team.findMany({
    orderBy: {
      createdDate: 'desc'
    },
    include: {
      players: true,
      teamStats: true,
      playerStats: true
    }
  })
  return NextResponse.json(teams, { status: 200 })
}

export async function POST(request: Request) {
  return NextResponse.json('Success', { status: 200 })
}
