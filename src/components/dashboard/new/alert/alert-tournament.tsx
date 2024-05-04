'use client'

import { fetcher } from '@/helpers/fetcher'
import { useActiveTournament } from '@/store/use-active-tournament'
import { Card, CardBody } from '@nextui-org/react'
import { MatchKey } from '@prisma/client'
import useSWR from 'swr'

const AlertTournament = () => {
  const {
    data: key_matches,
    isLoading,
    error
  } = useSWR<MatchKey[]>('/api/groups', fetcher)

  const EMPTY_MATCHES = 0
  const updatedActiveTournament = useActiveTournament(
    (state) => state.setActiveTournament
  )
  updatedActiveTournament((key_matches?.length ?? 0) > EMPTY_MATCHES)

  if (key_matches?.length === EMPTY_MATCHES) return

  if (error) return
  if (isLoading) return

  return (
    <Card className='bg-custom-red/30 p-8 col-span-11 border-2 border-custom-red'>
      <CardBody>
        <h3 className='text-center text-2xl text-custom-red/75'>
          There is an active Tournament. You cannot{' '}
          <span className='underline font-bold'>create/delete/edit</span> teams at the moment.
        </h3>
      </CardBody>
    </Card>
  )
}

export default AlertTournament
