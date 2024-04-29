'use client'

import { fetcher } from '@/helpers/fetcher'
import { TournamentGallery } from '@prisma/client'
import useSWR from 'swr'
import SkeletonGallery from '@/components/gallery/skeleton/skeleton-gallery'
import NoItems from '@/components/gallery/lists/no-items'
import CardTournamentImage from '@/components/gallery/cards/tournament/card-tournament-image'
import WrapperGallery from '@/components/gallery/wrappers/wrapper-gallery'

const ListTournamentGallery = () => {
  const EMPTY_ITEMS = 0

  const {
    data: tournamentGallery,
    isLoading,
    error
  } = useSWR<TournamentGallery[]>('/api/tournament-gallery', fetcher)

  if (error) return <p>An ocurred a error</p>
  if (tournamentGallery && tournamentGallery.length === EMPTY_ITEMS) {
    return <NoItems />
  }

  if (isLoading) {
    return <SkeletonGallery isLoaded={isLoading} />
  }

  return (
    <WrapperGallery>
      {tournamentGallery?.map((item) => (
        <CardTournamentImage key={item.id} item={item} />
      ))}
    </WrapperGallery>
  )
}

export default ListTournamentGallery
