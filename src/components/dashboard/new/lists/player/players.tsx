'use client'

import { Player } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import useSWR from 'swr'
import NoItems from '@/components/dashboard/new/lists/no-items'
import SkeletonNew from '@/components/dashboard/new/skeleton/skeleton-new'
import WrapperNew from '@/components/dashboard/new/wrappers/wrapper-new'
import CardPlayerImage from '@/components/dashboard/new/cards/players/card-player-image'
import CardError from '@/components/dashboard/new/errors/card-error'

const Players = () => {
  const EMPTY_ITEMS = 0

  const {
    data: players,
    isLoading,
    error
  } = useSWR<Player[]>('/api/players', fetcher)

  if (players?.length === EMPTY_ITEMS) {
    return <NoItems />
  }

  if (error) return <CardError message='Data could not be loaded.' />

  if (isLoading) {
    return <SkeletonNew />
  }

  return (
    <WrapperNew>
      {players?.map((player) => (
        <CardPlayerImage key={player.id} player={player} />
      ))}
    </WrapperNew>
  )
}

export default Players
