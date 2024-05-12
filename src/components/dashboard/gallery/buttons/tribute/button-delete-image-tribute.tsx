'use client'

import { deleteImageTribute } from '@/actions/services/delete'
import { deleteImage } from '@/helpers/delete-image'
import { Button, Tooltip } from '@nextui-org/react'
import { TributeGallery } from '@prisma/client'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonDeleteImageTribute = ({ gallery }: { gallery: TributeGallery }) => {
  const [isPending, startTransition] = useTransition()

  const handleDeleteImage = async () => {
    startTransition(async () => {
      const { status, message } = await deleteImageTribute(gallery.id)

      if (status === 200) {
        startTransition(() => {
          deleteImage({ id: gallery.id, path: 'tribute' })
          toast.success(message)
          mutate('/api/tribute-gallery')
          return
        })

        toast.error('An ocurred a error')
        return
      }
    })
  }

  return (
    <Tooltip content='Delete'>
      <Button
        size='sm'
        color='danger'
        isDisabled={isPending}
        onPress={() => handleDeleteImage()}
      >
        <IconTrash size={16} />
      </Button>
    </Tooltip>
  )
}

export default ButtonDeleteImageTribute
