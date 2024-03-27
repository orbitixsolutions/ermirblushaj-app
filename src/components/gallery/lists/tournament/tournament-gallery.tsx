'use client'

import { TournamentGallery } from '@prisma/client'
import axios from 'axios'
import useSWR from 'swr'
import SkeletonGallery from '@/components/gallery/skeleton/skeleton-gallery'
import NoItems from '@/components/gallery/lists/no-items'
import CardTournamentImage from '@/components/gallery/cards/tournament/card-tournament-image'
import WrapperGallery from '@/components/gallery/wrappers/wrapper-gallery'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const ListTournamentGallery = () => {
  const { data: tournamentGallery } = useSWR<TournamentGallery[]>(
    '/api/tournament-gallery',
    fetcher,
    {
      refreshInterval: 3000
    }
  )

  const DEFAULT_ITEMS = 0
  const UNDEFINED_GALLERY = undefined
  const isLoaded = tournamentGallery?.length === 0

  if (tournamentGallery && tournamentGallery.length === DEFAULT_ITEMS) {
    return <NoItems />
  }

  if (tournamentGallery === UNDEFINED_GALLERY) {
    return <SkeletonGallery isLoaded={isLoaded} />
  }

  return (
    <WrapperGallery>
      {tournamentGallery.map((item) => (
        <CardTournamentImage key={item.id} item={item} />
      ))}
    </WrapperGallery>
  )
}

export default ListTournamentGallery
