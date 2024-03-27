'use client'

import { uploadImage } from '@/helpers/upload-image'
import { useGetId } from '@/store/use-get-id'
import { Button } from '@nextui-org/react'
import { TournamentGallery } from '@prisma/client'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const ButtonEditImageTribute = ({
  gallery}: {
  gallery: TournamentGallery
}) => {
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
      uploadImage({
        id: getId,
        imgFile: editImage,
        path: 'tribute'
      })

      toast.success('Image edited!')
      resetId()
      return setEditImage(null)
    }

    return toast.error('An ocurred error')
  }

  return (
    <label htmlFor='edit-tribute'>
      <input
        id='edit-tribute'
        type='file'
        className='hidden'
        onChange={handleChangeImage}
      />
      <Button
        onPress={() => updatedGetId(gallery.id)}
        isIconOnly
        as='p'
        radius='full'
        size='sm'
        color='primary'
      >
        <IconEdit />
      </Button>
    </label>
  )
}

export default ButtonEditImageTribute
