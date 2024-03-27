'use client'

import { Player } from '@prisma/client'
import axios from 'axios'
import useSWR from 'swr'
import NoItems from '@/components/new/lists/no-items'
import SkeletonNew from '@/components/new/skeleton/skeleton-new'
import WrapperNew from '@/components/new/wrappers/wrapper-new'
import CardPlayerImage from '@/components/new/cards/players/card-player-image'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const Players = () => {
  const { data: players } = useSWR<Player[]>('/api/players', fetcher, {
    refreshInterval: 3000
  })

  const DEFAULT_ITEMS = 0
  const UNDEFINED_PLAYERS = undefined
  const isLoaded = players?.length === 0

  if (players && players.length === DEFAULT_ITEMS) {
    return <NoItems />
  }

  if (players === UNDEFINED_PLAYERS) {
    return <SkeletonNew isLoaded={isLoaded} />
  }

  return (
    <WrapperNew>
      {players &&
        players.map((player) => (
          <CardPlayerImage key={player.id} player={player} />
        ))}
    </WrapperNew>
  )
}

export default Players
