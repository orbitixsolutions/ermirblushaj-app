import prisma from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const groups = await prisma.group.findMany({
    include: {
      teams: true
    },
    orderBy: {
      name: 'asc'
    }
  })
  return NextResponse.json(groups, { status: 200 })
}

export async function POST(request: Request) {
  const data = await request.json()

  const newGroups = await prisma.group.create({
    data: {
      name: data.groupName,
      teams: {
        connect: data.teams
      }
    }
  })

  console.log(newGroups)

  return NextResponse.json(newGroups, { status: 200 })
}
