'use client'

import { TributeGallery } from '@prisma/client'
import axios from 'axios'
import useSWR from 'swr'
import SkeletonGallery from '@/components/gallery/skeleton/skeleton-gallery'
import NoItems from '@/components/gallery/lists/no-items'
import CardTributeImage from '@/components/gallery/cards/tribute/card-tribute-image'
import GalleryWrapper from '@/components/gallery/wrappers/wrapper-gallery'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const ListTributeGallery = () => {
  const { data: tributeGallery } = useSWR<TributeGallery[]>(
    '/api/tribute-gallery',
    fetcher,
    {
      refreshInterval: 3000
    }
  )

  const DEFAULT_ITEMS = 0
  const UNDEFINED_GALLERY = undefined
  const isLoaded = tributeGallery?.length === 0

  if (tributeGallery && tributeGallery.length === DEFAULT_ITEMS) {
    return <NoItems />
  }

  if (tributeGallery === UNDEFINED_GALLERY) {
    return <SkeletonGallery isLoaded={isLoaded} />
  }

  return (
    <GalleryWrapper>
      {tributeGallery.map((item) => (
        <CardTributeImage key={item.id} item={item} />
      ))}
    </GalleryWrapper>
  )
}

export default ListTributeGallery
