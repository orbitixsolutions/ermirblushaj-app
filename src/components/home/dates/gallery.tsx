'use client'

import { fetcher } from '@/helpers/fetcher'
import { Button, Card, Image } from '@nextui-org/react'
import { TournamentGallery } from '@prisma/client'
import SkeletonGallery from '@/components/home/skeleton/skeleton-gallery'
import ErrorGallery from '@/components/home/errors/error-gallery'
import useSWR from 'swr'

const Gallery = () => {
  const {
    data: tournament_images,
    isLoading,
    error
  } = useSWR<TournamentGallery[]>('/api/tournament-gallery', fetcher)

  if (error) return <ErrorGallery />
  if (isLoading) return <SkeletonGallery />

  return (
    <div className='w-[320px] mx-auto rounded-md overflow-hidden'>
      <div className='bg-custom-green w-full py-2'>
        <h2 className='text-xs text-center font-bold text-slate-950'>
          Gallery
        </h2>
      </div>
      <ol className='grid grid-cols-3'>
        {tournament_images?.map((image) => (
          <li key={image.id}>
            <Card radius='none' className='col-span-1 aspect-square'>
              <Image
                src={image.url}
                alt={image.id}
                radius='none'
                className='object-cover aspect-square'
              />
            </Card>
          </li>
        ))}
      </ol>
      <div>
        <Button
          fullWidth
          radius='none'
          size='sm'
          className='bg-custom-blue font-bold text-xs'
        >
          See more
        </Button>
      </div>
    </div>
  )
}

export default Gallery
