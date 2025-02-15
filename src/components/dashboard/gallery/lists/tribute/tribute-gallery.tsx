'use client'

import { TributeGallery } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import useSWR from 'swr'
import SkeletonGallery from '@/components/dashboard/gallery/skeleton/skeleton-gallery'
import NoItems from '@/components/dashboard/gallery/lists/no-items'
import CardTributeImage from '@/components/dashboard/gallery/cards/tribute/card-tribute-image'
import GalleryWrapper from '@/components/dashboard/gallery/wrappers/wrapper-gallery'
import ErrorAlert from '@/components/dashboard/gallery/lists/error-alert'

const ListTributeGallery = () => {
  const {
    data: tribute_gallery,
    isLoading,
    error
  } = useSWR<TributeGallery[]>('/api/tribute-gallery', fetcher)

  const EMPTY_ITEMS = tribute_gallery?.length === 0
  if (EMPTY_ITEMS) {
    return <NoItems />
  }

  if (error) return <ErrorAlert />
  
  if (isLoading) {
    return <SkeletonGallery />
  }

  return (
    <GalleryWrapper>
      {tribute_gallery?.map((gallery) => (
        <CardTributeImage key={gallery.id} gallery={gallery} />
      ))}
    </GalleryWrapper>
  )
}

export default ListTributeGallery
