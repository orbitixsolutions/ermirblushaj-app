import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const matches = await prisma.match.findMany({
    include: {
      teamA: true,
      teamB: true
    },
    orderBy: {
      playDate: 'asc'
    }
  })

  return NextResponse.json(matches, { status: 200 })
}

export async function POST(request: Request) {
  const data = await request.json()

  const matches = await prisma.match.findMany()
  const NO_MATCHES = matches.length === 40

  if (NO_MATCHES)
    return NextResponse.json(
      { error: 'Already exists matchups created!' },
      { status: 409 }
    )

  const newMatchup = await prisma.match.create({
    data
  })

  return NextResponse.json(newMatchup, { status: 200 })
}
