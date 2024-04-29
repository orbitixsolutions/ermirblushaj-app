import { Card, Spinner } from '@nextui-org/react'
import { TributeGallery } from '@prisma/client'
import TributeImage from '@/components/gallery/image/tribute/tribute-image'

const CardTributeImage = ({ item }: { item: TributeGallery }) => {
  const imageLoading = item.url === ''

  return (
    <li>
      <Card className='col-span-3 xs:col-span-2 md:col-span-1 bg-custom-darknavy relative aspect-square'>
        {imageLoading ? (
          <div className='w-full h-full grid place-items-center'>
            <Spinner color='primary' size='lg' />
          </div>
        ) : (
          <TributeImage gallery={item} />
        )}
      </Card>
    </li>
  )
}

export default CardTributeImage
