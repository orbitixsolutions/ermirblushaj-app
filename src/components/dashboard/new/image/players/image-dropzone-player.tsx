import { useLoadImageStore } from '@/store/use-load-image-store'
import { Image } from '@nextui-org/react'
import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageDropzonePlayer = () => {
  const { imagePlayer, updatedImagePlayer } = useLoadImageStore((state) => ({
    imagePlayer: state.imagePlayer,
    updatedImagePlayer: state.updatedImagePlayer
  }))

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const previewUrl = URL.createObjectURL(acceptedFiles[0])
      updatedImagePlayer({
        imgFile: acceptedFiles[0],
        imgPreview: previewUrl
      })
    },
    [updatedImagePlayer]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    if (imagePlayer.imgFile) {
      URL.revokeObjectURL(imagePlayer.imgPreview)
    }
  }, [imagePlayer.imgFile])

  return (
    <div
      className={`bg-custom-lightgray overflow-hidden w-full aspect-video md:aspect-square grid place-items-center rounded-xl cursor-pointer text-center text-2xl text-slate-900/40 ${
        isDragActive ? 'border-4 border-custom-blue' : 'border-2'
      }`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here ...</p>
      ) : imagePlayer.imgFile ? (
        <Image
          className=''
          src={URL.createObjectURL(imagePlayer.imgFile)}
          alt='New image preview'
        />
      ) : imagePlayer.imgPreview ? (
        <Image className='w-[150px] md:w-full' src={imagePlayer.imgPreview} alt='Player image' />
      ) : (
        <p>Drop player image</p>
      )}
    </div>
  )
}

export default ImageDropzonePlayer
