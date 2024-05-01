'use client'

import { uploadImage } from '@/helpers/upload-image'
import { Button, Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { mutate } from 'swr'
import { createImageTournamnet } from '@/actions/services/create'

const ButtonAddImageTournament = () => {
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    if (image) {
      sendImageTornament(image)
    }
  }, [image])

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
    }
  }

  const sendImageTornament = async (imgFile: File | null) => {
    if (imgFile === null) {
      return toast.info('Please upload a image!')
    }

    const data = {
      id: uuid(),
      url: ''
    }

    const { status, message } = await createImageTournamnet(data)
    if (status === 200) {
      uploadImage({ path: 'tournament', id: data.id, imgFile: image })
      setImage(null)
      mutate('/api/tournament-gallery')
      return toast.success(message)
    }

    return toast.error('An ocurred error')
  }

  return (
    <Tooltip
      placement='bottom'
      content={<h2 className='px-4 py-2 text-sm font-bold'>Add image</h2>}
    >
      <label htmlFor='image-tournament'>
        <input
          type='file'
          id='image-tournament'
          onChange={handleChangeImage}
          className='hidden'
        />
        <Button
          as='p'
          className='bg-custom-darkblue w-full p-4 h-24 text-2xl font-semibold uppercase text-custom-gray grid place-items-center rounded-xl cursor-pointer'
        >
          Add image
        </Button>
      </label>
    </Tooltip>
  )
}

export default ButtonAddImageTournament
