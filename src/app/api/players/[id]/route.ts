import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const playerId = params.id
  const playerById = await prisma.player.findUnique({
    where: {
      id: playerId
    }
  })
  return NextResponse.json(playerById, { status: 200 })
}
