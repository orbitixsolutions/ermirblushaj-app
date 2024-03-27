import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id
  const userById = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return NextResponse.json(userById, { status: 200 })
}
