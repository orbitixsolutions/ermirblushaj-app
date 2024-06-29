import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const matchesKeys = await prisma.matchKey.findMany()

  const allMatchesFinished =
    matchesKeys.length > 0 &&
    matchesKeys.every((match) => match.matchStatus === 'FINISHED')

  if (allMatchesFinished) {
    const topTeam = await prisma.team.findMany({
      orderBy: {
        position: 'asc'
      },
      take: 3
    })
    return NextResponse.json(topTeam, { status: 200, statusText: 'OK' })
  }

  return NextResponse.json([], { status: 200, statusText: 'OK' })
}
