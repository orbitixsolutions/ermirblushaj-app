'use client'

import { deleteImageTribute } from '@/actions/services/delete'
import { deleteImage } from '@/helpers/delete-image'
import { Button } from '@nextui-org/react'
import { TributeGallery } from '@prisma/client'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

const ButtonDeleteImageTribute = ({ gallery }: { gallery: TributeGallery }) => {
  const [isPending, startTransition] = useTransition()

  const handleDeleteImage = async () => {
    startTransition(async () => {
      const res = await deleteImageTribute(gallery.id)

      if (res.status === 200) {
        deleteImage({ id: gallery.id, path: 'tribute' })
        toast.success('Image deleted!')
        return
      }

      toast.error('An ocurred a error')
      return
    })
  }

  return (
    <Button
      isDisabled={isPending}
      onPress={() => handleDeleteImage()}
      isIconOnly
      radius='full'
      size='sm'
      color='danger'
    >
      <IconTrash />
    </Button>
  )
}

export default ButtonDeleteImageTribute
