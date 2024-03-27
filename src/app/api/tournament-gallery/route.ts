import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const tournamentGallery = await prisma.tournamentGallery.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
  return NextResponse.json(tournamentGallery, { status: 200 })
}

export async function POST(request: Request) {
  const data = await request.json()
  const newImageTournament = await prisma.tournamentGallery.create({
    data
  })

  return NextResponse.json(newImageTournament, { status: 200 })
}
