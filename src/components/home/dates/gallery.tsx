'use client'

import { fetcher } from '@/helpers/fetcher'
import { Button, Card, Image } from '@nextui-org/react'
import { TournamentGallery } from '@prisma/client'
import useSWR from 'swr'
import NoItems from './errors/no-items'
import ErrorAlert from './errors/error-alert'
import Loader from './loader/loader'

const Gallery = () => {
  const {
    data: tournament_images,
    isLoading,
    error
  } = useSWR<TournamentGallery[]>('/api/tournament-gallery', fetcher)

  const EMPTY_GALLERY = 0
  if (tournament_images?.length === EMPTY_GALLERY)
    return <NoItems message='No there images to display...' />

  if (error) return <ErrorAlert message='An ocurred a error.' />
  if (isLoading) return <Loader />

  return (
    <div className='col-span-12 lg:col-span-12 xl:col-span-4'>
      <div className='border-[1px] border-custom-lightgray rounded-md overflow-hidden'>
        <div className='bg-custom-green w-full py-2'>
          <h2 className='text-xs text-center font-bold text-slate-950'>
            Gallery
          </h2>
        </div>
        <ol className='grid grid-cols-3'>
          {tournament_images?.map((image) => (
            <li key={image.id}>
              <Card radius='none' className='col-span-1 size-full aspect-square'>
                <Image
                  radius='none'
                  src={image.url}
                  alt={image.id}
                  className='object-cover'
                />
              </Card>
            </li>
          ))}
        </ol>
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
