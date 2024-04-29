import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const tributeGallery = await prisma.tributeGallery.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return NextResponse.json(tributeGallery, { status: 200 })
}

