'use client'

import { mutate } from 'swr'

export const updatedData = () => {
  const routes = [
    '/api/matches/keys',
    '/api/matches/keys?column=a&phase=EIGHTH',
    '/api/matches/keys?column=b&phase=EIGHTH',

    '/api/matches/keys?column=a&phase=QUARTER',
    '/api/matches/keys?column=b&phase=QUARTER',

    '/api/matches/keys?column=a&phase=SEMIFINALS',
    '/api/matches/keys?column=b&phase=SEMIFINALS',

    '/api/matches/keys?column=none&phase=FINAL',

    '/api/matches/keys?phase=eighth&status=completed',

    '/api/matches/keys?phase=quarter&status=completed',

    '/api/matches/keys?phase=semifinals&status=completed',

    '/api/matches/keys?phase=final&status=completed',

    '/api/matches/keys/top'
  ]

  routes.forEach((route) => mutate(route))
}
