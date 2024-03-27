import { TournamentGallery } from '@prisma/client'
import { Card, CardFooter, Image } from '@nextui-org/react'
import ButtonDeleteImageTournament from '@/components/gallery/buttons/tournament/button-delete-image-tournament'
import ButtonEditImageTournament from '@/components/gallery/buttons/tournament/button-edit-image-tournament'

const TournamentImage = ({ gallery }: { gallery: TournamentGallery }) => {
  return (
    <>
      <Image
        className='aspect-square object-cover'
        src={gallery.url}
        alt={`image-${gallery.id}`}
      />
      <Card className='absolute bottom-0 z-20 w-full rounded-none'>
        <CardFooter className='p-1 justify-center gap-2 bg-custom-navy/50 '>
          <ButtonDeleteImageTournament gallery={gallery} />
          <ButtonEditImageTournament gallery={gallery} />
        </CardFooter>
      </Card>
    </>
  )
}

export default TournamentImage
