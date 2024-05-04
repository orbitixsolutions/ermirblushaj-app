import { Button, Card, Image } from '@nextui-org/react'
import prisma from '@/libs/prisma'

const getImagesTournament = async () => {
  const tournamentGallery = await prisma.tournamentGallery.findMany()
  return tournamentGallery
}

const Gallery = async () => {
  const images = await getImagesTournament()

  return (
    <div className='col-span-12 lg:col-span-12 xl:col-span-4'>
      <div className='border-[1px] border-custom-lightgray rounded-md overflow-hidden'>
        <div className='bg-custom-green w-full py-2'>
          <h2 className='text-xs text-center font-bold text-slate-950'>
            Gallery
          </h2>
        </div>
        <ol className='grid grid-cols-3'>
          {images?.map((image) => (
            <li key={image.id}>
              <Card
                radius='none'
                className='col-span-1 size-full aspect-square'
              >
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
