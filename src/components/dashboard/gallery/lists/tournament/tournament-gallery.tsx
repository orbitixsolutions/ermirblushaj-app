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
  const {
    data: tournament_gallery,
    isLoading,
    error
  } = useSWR<TournamentGallery[]>('/api/tournament-gallery', fetcher)

  const EMPTY_ITEMS = tournament_gallery?.length === 0
  if (EMPTY_ITEMS) {
    return <NoItems />
  }
  
  if (error) return <ErrorAlert />

  if (isLoading) {
    return <SkeletonGallery />
  }

  return (
    <WrapperGallery>
      {tournament_gallery?.map((gallery) => (
        <CardTournamentImage key={gallery.id} gallery={gallery} />
      ))}
    </WrapperGallery>
  )
}

export default ListTournamentGallery
