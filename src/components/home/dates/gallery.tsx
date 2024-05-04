import { Button, Card, Image } from '@nextui-org/react'
import ErrorDates from '@/components/home/errors/error-dates'
import prisma from '@/libs/prisma'

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
  const { data: gallery, status } = await getImagesTournament()

  if (status === 500) {
    return <ErrorDates message='Error loading data.' />
  }

  return (
    <div className='col-span-12 lg:col-span-12 xl:col-span-4'>
      <div className='border-[1px] border-custom-lightgray rounded-md overflow-hidden'>
        <div className='bg-custom-green w-full py-2'>
          <h2 className='text-xs text-center font-bold text-slate-950'>
            Gallery
          </h2>
        </div>
        <ol className='grid grid-cols-3'>
          {gallery?.slice(0, 9).map((image) => (
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
