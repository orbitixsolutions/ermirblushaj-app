import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const players = await prisma.player.findMany({
    orderBy: [
      {
        playerStatus: {
          goals: 'desc'
        }
      }
    ],
    include: {
      playerStatus: true,
      team: {
        select: {
          logo: true,
          teamStats: true
        }
      }
    },
    take: 10
  })
  return NextResponse.json(players, { status: 200 })
}
