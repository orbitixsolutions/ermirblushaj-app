import { ButtonGroup } from '@nextui-org/react'
import { TributeGallery } from '@prisma/client'
import ButtonEditImageTribute from '@/components/dashboard/gallery/buttons/tribute/button-edit-image-tribute'
import ButtonDeleteImageTribute from '@/components/dashboard/gallery/buttons/tribute/button-delete-image-tribute'

const ButtonOptionsTribute = ({ gallery }: { gallery: TributeGallery }) => {
  return (
    <ButtonGroup fullWidth>
      <ButtonEditImageTribute gallery={gallery} />
      <ButtonDeleteImageTribute gallery={gallery} />
    </ButtonGroup>
  )
}

export default ButtonOptionsTribute
