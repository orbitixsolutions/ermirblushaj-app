import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const groupsId = params.id

  const groupsById = await prisma.group.findUnique({
    where: {
      id: groupsId
    },
    include: {
      teams: true
    }
  })

  return NextResponse.json(groupsById, { status: 200 })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const groupsId = params.id

  const deleteGroups = await prisma.group.delete({
    where: {
      id: groupsId
    }
  })

  return NextResponse.json(deleteGroups, { status: 200 })
}
