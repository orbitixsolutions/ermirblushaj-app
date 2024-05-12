import { Card, CardFooter, Image, Spinner } from '@nextui-org/react'
import { TournamentGallery } from '@prisma/client'
import ButtonOptionsTournament from '../../buttons/options/button-options-tournament'

const CardTournamentImage = ({ gallery }: { gallery: TournamentGallery }) => {
  const imageLoading = gallery.url

  return (
    <Card className='col-span-3 md:col-span-1  bg-custom-darknavy relative aspect-square'>
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
        <ButtonOptionsTournament imageId={gallery.id} />
      </CardFooter>
    </Card>
  )
}

export default CardTournamentImage
