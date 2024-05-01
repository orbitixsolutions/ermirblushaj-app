'use client'

import { fetcher } from '@/helpers/fetcher'
import { TournamentGallery } from '@prisma/client'
import SkeletonGallery from '@/components/dashboard/gallery/skeleton/skeleton-gallery'
import CardTournamentImage from '@/components/dashboard/gallery/cards/tournament/card-tournament-image'
import WrapperGallery from '@/components/dashboard/gallery/wrappers/wrapper-gallery'
import NoItems from '@/components/dashboard/gallery/lists/no-items'
import useSWR from 'swr'
import ErrorAlert from '../error-alert'

const ListTournamentGallery = () => {
  const EMPTY_ITEMS = 0

  const {
    data: tournamentGallery,
    isLoading,
    error
  } = useSWR<TournamentGallery[]>('/api/tournament-gallery', fetcher)

  if (error) return <ErrorAlert />

  if (tournamentGallery?.length === EMPTY_ITEMS) {
    return <NoItems />
  }

  if (isLoading) {
    return <SkeletonGallery />
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
