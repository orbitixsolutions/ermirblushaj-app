import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const players = await prisma.player.findMany({
    orderBy: {
      createdDate: 'desc'
    }
  })
  return NextResponse.json(players, { status: 200 })
}