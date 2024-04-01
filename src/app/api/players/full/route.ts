import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const players = await prisma.player.findMany({
    orderBy: {
      createdDate: 'desc'
    },
    include: {
      playerStatus: true,
      team: true
    }
  })
  return NextResponse.json(players, { status: 200 })
}
