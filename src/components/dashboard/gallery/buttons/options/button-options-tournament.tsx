import { ButtonGroup } from '@nextui-org/react'
import ButtonDeleteImageTournament from '@/components/dashboard/gallery/buttons/tournament/button-delete-image-tournament'
import ButtonEditImageTournament from '@/components/dashboard/gallery/buttons/tournament/button-edit-image-tournament'

const ButtonOptionsTournament = ({ imageId }: { imageId: string }) => {
  return (
    <ButtonGroup fullWidth>
      <ButtonEditImageTournament imageId={imageId} />
      <ButtonDeleteImageTournament imageId={imageId} />
    </ButtonGroup>
  )
}

export default ButtonOptionsTournament
