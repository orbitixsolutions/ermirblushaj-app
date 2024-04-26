import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import { TournamentPhase } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { phase: string } }
) {
  const phaseStatus = params.phase.toUpperCase()

  const matchesKeys = await prisma.matchKey.findMany({
    include: {
      teamKeyA: true,
      teamKeyB: true
    },
    orderBy: {
      playStartDate: 'asc'
    },
    where: {
      column: 'A',
      phase: phaseStatus as TournamentPhase
    }
  })
  return NextResponse.json(matchesKeys, { status: 200, statusText: 'OK' })
}
