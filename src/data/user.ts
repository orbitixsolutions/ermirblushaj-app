'use server'

import prisma from '@/libs/prisma'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    return user
  } catch (error) {
    return null
  }
}

export const getUsers = async () => {
  try {
    const user = await prisma.user.findMany()

    return user
  } catch (error) {
    return null
  }
}
