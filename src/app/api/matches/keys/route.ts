import { MatchStatus, TournamentPhase } from '@prisma/client'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const column = searchParams.get('column')?.toUpperCase()
  const status = searchParams.get('status')?.toUpperCase() as MatchStatus
  const phase = searchParams.get('phase')?.toUpperCase() as TournamentPhase

  const matches = await prisma.matchKey.findMany({
    where: {
      column: column,
      phase: phase,
      status: status
    },
    orderBy: {
      order: 'asc'
    },
    include: {
      teamKeyA: true,
      teamKeyB: true
    }
  })

  return NextResponse.json(matches, { status: 200, statusText: 'OK' })
}
