import { useLoadImageStore } from '@/store/use-load-image-store'
import { Image } from '@nextui-org/image'
import { useEffect } from 'react'

const ImagePreviewPlayer = () => {
  const { imagePlayer, updatedImagePlayer } = useLoadImageStore((state) => ({
    imagePlayer: state.imagePlayer,
    updatedImagePlayer: state.updatedImagePlayer
  }))

  useEffect(() => {
    return () => {
      if (imagePlayer) {
        URL.revokeObjectURL(imagePlayer.imgPreview)
      }
    }
  }, [imagePlayer])

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const savedImage = e.target.files[0]
      try {
        const url = URL.createObjectURL(savedImage)
        updatedImagePlayer({
          imgFile: savedImage,
          imgPreview: url
        })
      } catch (error) {
        updatedImagePlayer({
          imgFile: null,
          imgPreview: ''
        })
      }
    }
  }

  return (
    <>
      {imagePlayer.imgPreview === '' || null ? (
        <label htmlFor='photo-player' className='bg-white col-span-4'>
          <p className='cursor-pointer text-2xl text-slate-900/40 grid place-items-center text-center w-full h-60'>
            Enter player image
          </p>
          <input
            id='photo-player'
            className='hidden'
            type='file'
            onChange={handleChangeImage}
          />
        </label>
      ) : (
        <label
          htmlFor='photo-player-input'
          className='cursor-pointer text-2xl text-slate-900/40 grid place-items-center col-span-4'
        >
          <input
            type='file'
            id='photo-player-input'
            name='photo-player'
            className='hidden'
            onChange={handleChangeImage}
          />
          <Image
            className='w-full h-60 object-cover'
            src={imagePlayer.imgPreview}
            alt={`Player image`}
          />
        </label>
      )}
    </>
  )
}

export default ImagePreviewPlayer
