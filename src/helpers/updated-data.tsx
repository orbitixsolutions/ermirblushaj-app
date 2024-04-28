'use client'

import { mutate } from 'swr'

export const updatedData = () => {
  const routes = [
    '/api/matches/keys',
    '/api/matches/keys?column=a&phase=eighth',
    '/api/matches/keys?column=b&phase=eighth',
    '/api/matches/keys?column=a&phase=quarter',
    '/api/matches/keys?column=b&phase=quarter',
    '/api/matches/keys?column=a&phase=semifinals',
    '/api/matches/keys?column=b&phase=semifinals',
    '/api/matches/keys?column=none&phase=final',
    '/api/matches/keys?phase=eighth&status=completed',
    '/api/matches/keys?phase=quarter&status=completed',
    '/api/matches/keys?phase=semifinals&status=completed',
    '/api/matches/keys?phase=final&status=completed',
    '/api/matches/keys/top'
  ]

  console.log('Updated data!')

  routes.forEach((route) => mutate(route))
}
