'use client'

import { deleteImageTournament } from '@/actions/services/delete'
import { deleteImage } from '@/helpers/delete-image'
import { Button, Tooltip } from '@nextui-org/react'
import { IconTrash } from '@tabler/icons-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { mutate } from 'swr'

const ButtonDeleteImageTournament = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition()

  const handleDeleteImage = async () => {
    startTransition(async () => {
      const { status, message } = await deleteImageTournament(imageId)

      if (status === 200) {
        deleteImage({ id: imageId, path: 'tournament' })
        toast.success(message)
        mutate('/api/tournament-gallery')
        return
      }

      toast.error('An ocurred a error')
      return
    })
  }

  return (
    <Tooltip content={<p>Delete</p>} placement='bottom'>
      <Button
        size='sm'
        color='danger'
        className='bg-custom-red'
        isLoading={isPending}
        onPress={() => handleDeleteImage()}
      >
        <IconTrash size={16} />
      </Button>
    </Tooltip>
  )
}

export default ButtonDeleteImageTournament
