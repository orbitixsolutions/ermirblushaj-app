import { Card, Spinner } from '@nextui-org/react'
import { TournamentGallery } from '@prisma/client'
import TournamentImage from '@/components/gallery/image/tournament/tournament-image'

const CardTournamentImage = ({ item }: { item: TournamentGallery }) => {
  const imageLoading = item.url === ''

  return (
    <Card className='col-span-3 xs:col-span-2 md:col-span-1 bg-custom-darknavy relative aspect-square'>
      {imageLoading ? (
        <div className='w-full h-full grid place-items-center'>
          <Spinner color='primary' size='lg' />
        </div>
      ) : (
        <TournamentImage gallery={item} />
      )}
    </Card>
  )
}

export default CardTournamentImage
