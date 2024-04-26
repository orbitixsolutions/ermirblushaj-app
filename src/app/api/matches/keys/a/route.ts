import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
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
      phase: 'EIGHTH'
    }
  })
  return NextResponse.json(matchesKeys, { status: 200, statusText: 'OK' })
}
