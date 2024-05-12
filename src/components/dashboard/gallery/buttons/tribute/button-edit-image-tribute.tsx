'use client'

import { useEffect, useState, useTransition } from 'react'
import { uploadImage } from '@/helpers/upload-image'
import { Button, Tooltip } from '@nextui-org/react'
import { IconEdit } from '@tabler/icons-react'
import { toast } from 'sonner'

const ButtonEditImageTribute = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition()
  const [editImage, setEditImage] = useState<File | null>(null)
  const [currentId, setNewId] = useState('')

  useEffect(() => {
    if (editImage) {
      sendImageTribute(editImage)
    }
  }, [editImage])

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    setEditImage(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setEditImage(file)
    }
  }

  const sendImageTribute = (imgFile: File | null) => {
    if (imgFile === null) {
      return toast.info('Please upload a image!')
    }

    if (imageId !== '') {
      startTransition(async () => {
        uploadImage({
          id: currentId,
          imgFile: editImage,
          path: 'tribute'
        })

        toast.success('Image edited!')
        setEditImage(null)
        setNewId('')
      })

      return
    }

    return toast.error('An ocurred error')
  }

  const handleOpenInput = (id: string) => {
    const input = document.getElementById(`input-${id}`) as HTMLInputElement
    input.click()
    setNewId(id)
  }

  return (
    <Tooltip content={<p>Edit</p>} placement='bottom'>
      <Button
        size='sm'
        color='primary'
        className='bg-custom-blue'
        isLoading={isPending}
        onPress={() => handleOpenInput(imageId)}
      >
        <input
          type='file'
          className='hidden'
          id={`input-${imageId}`}
          onChange={handleChangeImage}
        />
        <IconEdit size={16} />
      </Button>
    </Tooltip>
  )
}

export default ButtonEditImageTribute
