import { getTranslations } from 'next-intl/server'
import { Card, Image } from '@nextui-org/react'
import ErrorDates from '@/components/home/errors/error-dates'
import prisma from '@/libs/prisma'
import ModalGallery from './modal/modal-gallery'

const getImagesTournament = async () => {
  try {
    const images = await prisma.tournamentGallery.findMany()
    return {
      data: images,
      status: 200,
      message: 'Success'
    }
  } catch (error: any) {
    return { data: null, status: 500, message: error.message }
  }
}

const Gallery = async () => {
  const content = await getTranslations('Dates')
  const { data: gallery, status } = await getImagesTournament()

  const EMPTY_GALLERY = !gallery?.length
  if (EMPTY_GALLERY) return

  if (status === 500) {
    return <ErrorDates message='Error loading data.' />
  }

  const contentGallery = {
    title: content('gallery.title'),
    button: content('gallery.button')
  }

  return (
    <div className='mx-auto max-w-full w-[480px] md:w-[640px] xl:max-w-full col-span-12 xl:col-span-4'>
      <div className='border-[1px] border-custom-lightgray rounded-md overflow-hidden'>
        <div className='bg-custom-green w-full py-2'>
          <h2 className='text-xs text-center font-bold text-slate-950'>
            {contentGallery.title}
          </h2>
        </div>
        <ol className='grid grid-cols-3'>
          {gallery?.slice(0, 9).map((image) => (
            <li key={image.id} className='col-span-1'>
              <Card radius='none' className='w-full h-full bg-custom-lightgray'>
                <Image
                  radius='none'
                  src={image.url!}
                  alt={image.id}
                  className='aspect-square size-full object-cover'
                />
              </Card>
            </li>
          ))}
        </ol>
        <ModalGallery gallery={gallery} content={contentGallery} />
      </div>
    </div>
  )
}

export default Gallery
