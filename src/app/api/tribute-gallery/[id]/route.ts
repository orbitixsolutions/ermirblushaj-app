import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tributeId = params.id
  const tributeById = await prisma.tributeGallery.findUnique({
    where: {
      id: tributeId
    }
  })

  return NextResponse.json(tributeById, { status: 200 })
}
