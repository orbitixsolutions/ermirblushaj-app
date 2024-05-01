import { TributeGallery } from '@prisma/client'
import { Card, CardFooter, Image } from '@nextui-org/react'
import ButtonDeleteImageTribute from '@/components/dashboard/gallery/buttons/tribute/button-delete-image-tribute'
import ButtonEditImageTribute from '@/components/dashboard/gallery/buttons/tribute/button-edit-image-tribute'

const TributeImage = ({ gallery }: { gallery: TributeGallery }) => {
  return (
    <>
      <Image
        className='aspect-square object-cover'
        src={gallery.url}
        alt={`image-${gallery.id}`}
      />
      <Card className='absolute bottom-0 z-20 w-full rounded-none'>
        <CardFooter className='p-1 justify-center gap-2 bg-custom-navy/50 '>
          <ButtonDeleteImageTribute gallery={gallery} />
          <ButtonEditImageTribute gallery={gallery} />
        </CardFooter>
      </Card>
    </>
  )
}

export default TributeImage
