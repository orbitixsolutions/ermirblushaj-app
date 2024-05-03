import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(request: Request) {
  const tournamentGallery = await prisma.tournamentGallery.findMany({
    take: 9
  })

  return NextResponse.json(tournamentGallery, { status: 200 })
}
