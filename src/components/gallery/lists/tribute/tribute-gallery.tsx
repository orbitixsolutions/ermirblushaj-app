'use client'

import { TributeGallery } from '@prisma/client'
import { fetcher } from '@/helpers/fetcher'
import useSWR from 'swr'
import SkeletonGallery from '@/components/gallery/skeleton/skeleton-gallery'
import NoItems from '@/components/gallery/lists/no-items'
import CardTributeImage from '@/components/gallery/cards/tribute/card-tribute-image'
import GalleryWrapper from '@/components/gallery/wrappers/wrapper-gallery'

const ListTributeGallery = () => {
  const EMPTY_ITEMS = 0

  const { data: tribute_gallery, isLoading, error } = useSWR<TributeGallery[]>(
    '/api/tribute-gallery', fetcher)

  if (error) return <p>An ocurred a error</p>

  if (tribute_gallery && tribute_gallery.length === EMPTY_ITEMS) {
    return <NoItems />
  }

  if (isLoading) {
    return <SkeletonGallery isLoaded={isLoading} />
  }

  return (
    <GalleryWrapper>
      {tribute_gallery?.map((item) => (
        <CardTributeImage key={item.id} item={item} />
      ))}
    </GalleryWrapper>
  )
}

export default ListTributeGallery
