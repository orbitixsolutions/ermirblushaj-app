import { TributeGallery } from '@prisma/client'
import { Card, CardFooter, Image } from '@nextui-org/react'
import ButtonDeleteImageTribute from '@/components/dashboard/gallery/buttons/tribute/button-delete-image-tribute'
import ButtonEditImageTribute from '@/components/dashboard/gallery/buttons/tribute/button-edit-image-tribute'

const TributeImage = ({ gallery }: { gallery: TributeGallery }) => {
  return (
    <>
      <Card className='w-full rounded-none'>
        <Image
          className='aspect-square size-full object-cover'
          src={gallery.url}
          alt={`image-${gallery.id}`}
        />
        <CardFooter className='w-full gap-1 p-1 flex items-center justify-center absolute z-50 bottom-0 bg-custom-navy/50'>
          <ButtonDeleteImageTribute gallery={gallery} />
          <ButtonEditImageTribute gallery={gallery} />
        </CardFooter>
      </Card>
    </>
  )
}

export default TributeImage
