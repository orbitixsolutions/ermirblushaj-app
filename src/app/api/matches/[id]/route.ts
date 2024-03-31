import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const matchesId = params.id

  const matchesById = await prisma.match.findUnique({
    where: {
      id: matchesId
    },
    include: {
      teamA: true,
      teamB: true
    }
  })

  return NextResponse.json(matchesById, { status: 200 })
}