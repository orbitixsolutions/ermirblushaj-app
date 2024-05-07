import { TournamentGallery } from '@prisma/client'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import ButtonDeleteImageTournament from '@/components/dashboard/gallery/buttons/tournament/button-delete-image-tournament'
import ButtonEditImageTournament from '@/components/dashboard/gallery/buttons/tournament/button-edit-image-tournament'

const TournamentImage = ({ gallery }: { gallery: TournamentGallery }) => {
  return (
    <>
      <Card className='w-full rounded-none'>
        <Image
          className='aspect-square size-full object-cover'
          src={gallery.url}
          alt={`image-${gallery.id}`}
        />
        <CardFooter className='w-full gap-1 p-1 flex items-center justify-center absolute z-50 bottom-0 bg-custom-navy/50'>
          <ButtonDeleteImageTournament gallery={gallery} />
          <ButtonEditImageTournament gallery={gallery} />
        </CardFooter>
      </Card>
    </>
  )
}

export default TournamentImage
