import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tournamentId = params.id
  const tournamentById = await prisma.tournamentGallery.findUnique({
    where: {
      id: tournamentId
    }
  })

  return NextResponse.json(tournamentById, { status: 200 })
}
