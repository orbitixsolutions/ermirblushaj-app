import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const tournamentGallery = await prisma.tournamentGallery.findMany()
  return NextResponse.json(tournamentGallery, { status: 200 })
}
