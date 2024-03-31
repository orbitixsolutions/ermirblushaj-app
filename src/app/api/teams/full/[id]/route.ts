import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const teamId = params.id
  const teamById = await prisma.team.findUnique({
    where: {
      id: teamId
    },
    include: {
        players: true,
        teamStats: true,
        playerStats: true
      }
  })
  return NextResponse.json(teamById, { status: 200 })
}
