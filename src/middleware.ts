import authConfig from '@/auth.config'
import NextAuth from 'next-auth'
import createMiddleware from 'next-intl/middleware'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from '@/routes'
import { NextRequest, NextResponse } from 'next/server'

export const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return undefined
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return undefined
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/admin/login', nextUrl))
  }

  return undefined
})

export async function middleware(request: NextRequest) {
  const initMiddleware: (request: NextRequest) => NextResponse<unknown> =
    createMiddleware({
      locales: ['it', 'sq', 'en'],
      defaultLocale: 'it'
    })

  return initMiddleware(request)
}

export const config = {
  matcher: [
    '/',
    '/(it|sq|en)/((?!.+\\.[\\w]+$|_next).*)',
    '/(it|sq|en)/(api|trpc)(.*)',
    '/(it|sq|en)/:path*'
  ]
}
