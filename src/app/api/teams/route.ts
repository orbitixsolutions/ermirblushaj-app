import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const teams = await prisma.team.findMany({
    orderBy: {
      createdDate: 'desc'
    },
  })
  return NextResponse.json(teams, { status: 200 })
}
