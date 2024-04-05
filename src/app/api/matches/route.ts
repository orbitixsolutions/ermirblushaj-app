import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const matches = await prisma.match.findMany({
    include: {
      teamA: {
        include: {
          teamStats: true,
          matchHistory: true
        }
      },
      teamB: {
        include: {
          teamStats: true
        }
      }
    },
    orderBy: {
      playStartDate: 'asc'
    }
  })

  return NextResponse.json(matches, { status: 200 })
}
