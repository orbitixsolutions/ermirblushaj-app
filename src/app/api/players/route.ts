import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const players = await prisma.player.findMany({
    orderBy: [
      { teamName: 'asc' },
      { firstName: 'asc' },
      { createdDate: 'desc' }
    ]
  })
  return NextResponse.json(players, { status: 200 })
}
