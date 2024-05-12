'use client'

import { uploadImage } from '@/helpers/upload-image'
import { useGetId } from '@/store/use-get-id'
import { Button, Tooltip } from '@nextui-org/react'
import { TournamentGallery } from '@prisma/client'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

const ButtonEditImageTribute = ({
  gallery
}: {
  gallery: TournamentGallery
}) => {
  const [isPending, startTransition] = useTransition()
  const [editImage, setEditImage] = useState<File | null>(null)

  const { getId, resetId, updatedGetId } = useGetId((state) => ({
    getId: state.getId,
    updatedGetId: state.updatedGetId,
    resetId: state.resetId
  }))

  useEffect(() => {
    if (editImage) {
      sendImageTribute(editImage)
    }
  }, [editImage])

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditImage(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setEditImage(file)
    }
  }

  const sendImageTribute = async (imgFile: File | null) => {
    if (imgFile === null) {
      return toast.info('Please upload a image!')
    }

    if (gallery.id !== '') {
      startTransition(() => {
        uploadImage({
          id: getId,
          imgFile: editImage,
          path: 'tribute'
        })

        toast.success('Image edited!')
        setEditImage(null)
        resetId()
        return
      })
    }

    return toast.error('An ocurred error')
  }

  return (
    <Tooltip content='Edit'>
      <Button
        size='sm'
        as='label'
        color='primary'
        htmlFor='edit-tribute'
        isDisabled={isPending}
        onPress={() => updatedGetId(gallery.id)}
      >
        <input
          id='edit-tribute'
          type='file'
          className='hidden'
          onChange={handleChangeImage}
        />
        <IconEdit size={16} />
      </Button>
    </Tooltip>
  )
}

export default ButtonEditImageTribute
