'use client'

import { TributeGallery } from '@prisma/client'
import axios from 'axios'
import useSWR from 'swr'
import SkeletonGallery from '@/components/gallery/skeleton/skeleton-gallery'
import NoItems from '@/components/gallery/lists/no-items'
import CardTributeImage from '@/components/gallery/cards/tribute/card-tribute-image'
import GalleryWrapper from '@/components/gallery/wrappers/wrapper-gallery'
import { fetcher } from '@/helpers/fetcher'

const ListTributeGallery = () => {
  const EMPTY_ITEMS = 0

  const { data: tributeGallery, isLoading, error } = useSWR<TributeGallery[]>(
    '/api/tribute-gallery',
    fetcher,
    {
      refreshInterval: 3000
    }
  )

  if (error) return <p>An ocurred a error</p>

  if (tributeGallery && tributeGallery.length === EMPTY_ITEMS) {
    return <NoItems />
  }

  if (isLoading) {
    return <SkeletonGallery isLoaded={isLoading} />
  }

  return (
    <GalleryWrapper>
      {tributeGallery?.map((item) => (
        <CardTributeImage key={item.id} item={item} />
      ))}
    </GalleryWrapper>
  )
}

export default ListTributeGallery
