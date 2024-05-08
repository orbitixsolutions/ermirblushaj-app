/**
 * En este arreglo de rutas es accesible al
 * publico y estas rutas no requieren de autentificacion
 * @Type {string[]}
 */

export const publicRoutes = [
  '/',
  '/en',
  '/it',
  '/sq',
  '/en/tribute',
  '/it/tribute',
  '/sq/tribute'
]

/**
 * En este arreglo de rutas es para la autentificacion
 * y estas mismas rutas te redireccionan a la ruta /dashboard
 * @Type {string[]}
 */

export const authRoutes = [
  '/en/admin/login',
  '/it/admin/login',
  '/sq/admin/login'
]

/**
 * Este es el prefix para la auntenticacion de las rutas API
 * las rutas empiezan con este prefix para usarlo con la API
 * @Type {string}
 */

export const apiAuthPrefix = '/api/auth'

/**
 * La ruta por defecto despues de auntetificarse
 * @Type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/it/dashboard'
