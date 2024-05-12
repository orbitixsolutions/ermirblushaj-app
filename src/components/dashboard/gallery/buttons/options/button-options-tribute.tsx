import { ButtonGroup } from '@nextui-org/react'
import ButtonEditImageTribute from '@/components/dashboard/gallery/buttons/tribute/button-edit-image-tribute'
import ButtonDeleteImageTribute from '@/components/dashboard/gallery/buttons/tribute/button-delete-image-tribute'

const ButtonOptionsTribute = ({ imageId }: { imageId: string }) => {
  return (
    <ButtonGroup fullWidth>
      <ButtonEditImageTribute imageId={imageId} />
      <ButtonDeleteImageTribute imageId={imageId} />
    </ButtonGroup>
  )
}

export default ButtonOptionsTribute
