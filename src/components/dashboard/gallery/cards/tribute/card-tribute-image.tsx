import { Card, CardFooter, Image, Spinner } from '@nextui-org/react'
import { TributeGallery } from '@prisma/client'
import ButtonOptionsTribute from '@/components/dashboard/gallery/buttons/options/button-options-tribute'

const CardTributeImage = ({ gallery }: { gallery: TributeGallery }) => {
  const imageLoading = gallery.url

  return (
    <Card
      isFooterBlurred
      className='col-span-3 md:col-span-1  bg-custom-darknavy relative aspect-square group/card'
    >
      {!imageLoading ? (
        <Spinner
          color='primary'
          size='lg'
          className='absolute z-20 size-full grid place-items-center '
        />
      ) : (
        <Image
          className='aspect-square size-full object-cover'
          src={gallery.url!}
          alt={`image-${gallery.id}`}
        />
      )}

      <CardFooter className='justify-between overflow-hidden p-0 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
        <ButtonOptionsTribute gallery={gallery} />
      </CardFooter>
    </Card>
  )
}

export default CardTributeImage
