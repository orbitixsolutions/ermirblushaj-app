import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const groups = await prisma.group.findMany({
    include: {
      teams: true
    },
    orderBy: {
      name: 'asc'
    }
  })
  return NextResponse.json(groups, { status: 200 })
}
