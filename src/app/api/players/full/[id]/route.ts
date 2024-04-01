import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const playerId = params.id
  const playerById = await prisma.player.findUnique({
    where: {
      id: playerId
    },
    include: {
      playerStatus: true,
      team: true
    }
  })
  return NextResponse.json(playerById, { status: 200 })
}
