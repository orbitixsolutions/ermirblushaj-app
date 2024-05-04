'use server'

import prisma from '@/libs/prisma'

export const dataMatchesKeys = async () => {
  try {
    const matches = await prisma.matchKey.findMany({
      include: {
        teamKeyA: true,
        teamKeyB: true,
        matchKeyHistory: true
      }
    })

    return { data: matches, message: 'Data loaded!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error!', status: 500 }
  }
}

export const dataMatchesById = async (matchId: string) => {
  try {
    const matches = await prisma.match.findUnique({
      where: {
        id: matchId
      },
      include: {
        teamA: true,
        teamB: true,
        matchHistory: true
      }
    })

    return { data: matches, message: 'Data loaded!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error!', status: 500 }
  }
}

export const dataMatchesKeysById = async (matchKeyId: string) => {
  try {
    const matches = await prisma.matchKey.findUnique({
      where: {
        id: matchKeyId
      },
      include: {
        teamKeyA: true,
        teamKeyB: true,
        matchKeyHistory: true
      }
    })

    return { data: matches, message: 'Data loaded!', status: 200 }
  } catch (error) {
    return { error: 'An occurred error!', status: 500 }
  }
}
