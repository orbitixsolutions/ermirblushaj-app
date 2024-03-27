import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const tributeGallery = await prisma.tributeGallery.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return NextResponse.json(tributeGallery, { status: 200 })
}

export async function POST(request: Request) {
  const data = await request.json()
  const newImageTribute = await prisma.tributeGallery.create({
    data
  })

  return NextResponse.json(newImageTribute, { status: 200 })
}
