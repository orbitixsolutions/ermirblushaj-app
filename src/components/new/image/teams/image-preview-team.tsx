import { useLoadImageStore } from '@/store/use-load-image-store'
import { Image } from '@nextui-org/image'
import { useEffect } from 'react'

const ImagePreviewTeam = () => {
  const { imageTeam, updatedImageTeam } = useLoadImageStore((state) => ({
    imageTeam: state.imageTeam,
    updatedImageTeam: state.updatedImageTeam
  }))

  useEffect(() => {
    return () => {
      if (imageTeam.imgPreview) {
        URL.revokeObjectURL(imageTeam.imgPreview)
      }
    }
  }, [imageTeam])

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const savedImage = e.target.files[0]
      try {
        const url = URL.createObjectURL(savedImage)
        updatedImageTeam({
          imgFile: savedImage,
          imgPreview: url
        })
      } catch (error) {
        updatedImageTeam({
          imgFile: null,
          imgPreview: ''
        })
      }
    }
  }

  return (
    <>
      {imageTeam.imgPreview === '' ? (
        <div className='relative'>
          <input
            type='file'
            id='photo-team-input'
            name='photo-team'
            className='hidden'
            onChange={handleChangeImage}
          />
          <label
            htmlFor='photo-team-input'
            className='bg-custom-lightgray w-full h-80 object-cover grid place-items-center rounded-xl cursor-pointer text-center text-2xl text-slate-900/40'
          >
            Enter Shield
          </label>
        </div>
      ) : (
        <div className='w-full flex justify-center rounded-lg overflow-hidden'>
          <input
            type='file'
            id='photo-team-input'
            name='photo-team'
            className='hidden'
            onChange={handleChangeImage}
          />
          <label className='cursor-pointer' htmlFor='photo-team-input'>
            <Image
              className='w-full h-80 object-cover'
              src={imageTeam.imgPreview}
              alt={'Club Image'}
            />
          </label>
        </div>
      )}
    </>
  )
}

export default ImagePreviewTeam
