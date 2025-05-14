import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes
} from '@/routes'
import authConfig from '@/auth.config'
import NextAuth from 'next-auth'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

export const { auth } = NextAuth(authConfig)

export async function middleware(request: NextRequest, response: any) {
  const languageMiddleware: (request: NextRequest) => NextResponse<unknown> =
    createMiddleware({
      locales: ['it', 'sq', 'en'],
      defaultLocale: 'it'
    })

  const authMiddleware = auth(async (req) => {
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
      console.log('NOT LOGGED')
      return Response.redirect(new URL('/it/admin/login', nextUrl))
    }

    return undefined
  })

  // Ejecuta el middleware de autenticación
  const authResponse = await authMiddleware(request, response)

  // Si el middleware de autenticación devuelve una respuesta de redirección, devuélvela
  if (authResponse && authResponse.status === 302) {
    return authResponse
  }

  // Si no, ejecuta el middleware de idioma
  return languageMiddleware(request)
}

export const config = {
  matcher: [
    '/',
    '/(it|sq|en)/((?!.+\\.[\\w]+$|_next).*)',
    '/(it|sq|en)/(api|trpc)(.*)',
    '/(it|sq|en)/:path*'
  ]
}
