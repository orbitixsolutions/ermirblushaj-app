import NextAuth, { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'ADMIN' | 'OWNER'
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}

import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'ADMIN' | 'OWNER'
  }
}
