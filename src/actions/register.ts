'use server'

import * as z from 'zod'

import { getUserByEmail } from '@/data/user'
import { RegisterAdminSchema } from '@/schemas'
import { UserRole } from '@prisma/client'
import prisma from '@/libs/prisma'
import bcrypt from 'bcryptjs'

export const registerAdmin = async (
  values: z.infer<typeof RegisterAdminSchema>
) => {
  const validateFields = RegisterAdminSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalidad fields!' }
  }

  const { email, password, name, role } = values
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email alredy in use!' }
  }

  await prisma.user.create({
    data: {
      name,
      email,
      role: role as UserRole,
      password: hashedPassword
    }
  })

  return { success: 'User created!' }
}
