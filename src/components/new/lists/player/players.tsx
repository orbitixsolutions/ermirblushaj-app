'use client'

import { Player } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import useSWR from 'swr'
import NoItems from '@/components/new/lists/no-items'
import SkeletonNew from '@/components/new/skeleton/skeleton-new'
import WrapperNew from '@/components/new/wrappers/wrapper-new'
import CardPlayerImage from '@/components/new/cards/players/card-player-image'

const Players = () => {
  const EMPTY_ITEMS = 0

  const {
    data: players,
    isLoading,
    error
  } = useSWR<Player[]>('/api/players', fetcher)

  if (error) return <h2>Data could not be loaded.</h2>

  if (players?.length === EMPTY_ITEMS) {
    return <NoItems />
  }

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
