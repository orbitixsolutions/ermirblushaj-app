import { Card, Image } from '@nextui-org/react'
import { TributeGallery } from '@prisma/client'
import prisma from '@/libs/prisma'
import ModalGallery from './modal/modal-gallery'
import { getTranslations } from 'next-intl/server'

const getImages = async () => {
  const images = await prisma.tributeGallery.findMany()
  return images as TributeGallery[]
}

const Gallery = async () => {
  const tribute_images = await getImages()
  const content = await getTranslations('Tributte')

  const contentModal = {
    title: content('title'),
    gallery: {
      title: content('gallery.title'),
      modal_title: content('gallery.modal_title'),
      button: content('gallery.button')
    }
  }

  return (
    <section className='flex max-w-[1024px] mx-auto py-16 md:py-24 px-5 justify-center lg:justify-between flex-wrap space-y-8'>
      <h2 className='w-full text-center text-2xl text-custom-lightgray font-bold'>
        {content('title')}
      </h2>
      <ol className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {tribute_images.slice(0, 9).map((image) => (
          <li key={image.id} className='size-full'>
            <Card className='aspect-square'>
              <Image
                className='aspect-square size-full object-cover'
                src={image.url}
                alt={`Tribute image`}
              />
            </Card>
          </li>
        ))}
      </ol>
      <ModalGallery content={contentModal} gallery={tribute_images} />
    </section>
  )
}

export default Gallery
