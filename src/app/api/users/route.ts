import { getUserByEmail } from '@/data/user'
import { RegisterAdminSchema } from '@/schemas'
import { UserRole } from '@prisma/client'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import bcrypt from 'bcryptjs'

export async function GET(request: Request) {
  const users = await prisma.user.findMany()

  return NextResponse.json(users, { status: 200 })
}

export async function POST(request: Request) {
  const values = await request.json()
  const validateFields = RegisterAdminSchema.safeParse(values)

  if (!validateFields.success) {
    return NextResponse.json({ error: 'Invalid fields!' }, { status: 400 })
  }

  const { email, password, name, role } = values
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return NextResponse.json({ error: 'Email alredy in use!' }, { status: 409 })
  }
  
  const emailLowerCase = email.toLowerCase()
  const newUser = await prisma.user.create({
    data: {
      name,
      email: emailLowerCase,
      role: role as UserRole,
      password: hashedPassword
    }
  })

  return NextResponse.json(newUser, { status: 200 })
}
