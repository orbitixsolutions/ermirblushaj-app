import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const matches = await prisma.match.findMany({
    where: {
      playStartDate: {
        notIn: null
      },
      status: {
        equals: 'LIVE'
      }
    },
    include: {
      teamA: true,
      teamB: true
    },
    take: 10
  })

  try {
    return NextResponse.json(matches, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'An ocurred a error!', error: error },
      { status: 500 }
    )
  }
}
