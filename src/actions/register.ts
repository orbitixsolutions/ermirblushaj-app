'use server'

import * as z from 'zod'

import { getUserByEmail } from '@/data/user'
import { RegisterAdminSchema } from '@/schemas'
import prisma from '@/libs/prisma'
import bcrypt from 'bcryptjs'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const registerAdmin = async (
  values: z.infer<typeof RegisterAdminSchema>
) => {
  const validateFields = RegisterAdminSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: 'Invalidad fields!' }
  }

  const { email, password, name } = values

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email alredy in use!' }
  }

  await prisma.user.create({
    data: {
      name,
      email,
      role: 'OWNER',
      password: hashedPassword
    }
  })

  signIn('credentials', {
    email,
    password: hashedPassword,
    redirectTo: DEFAULT_LOGIN_REDIRECT
  })

  return { success: 'User created!' }
}
