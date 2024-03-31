import { useLoadImageStore } from '@/store/use-load-image-store'
import { Image } from '@nextui-org/react'
import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageDropzoneTeam = () => {
  const { imageTeam, updatedImageTeam } = useLoadImageStore((state) => ({
    imageTeam: state.imageTeam,
    updatedImageTeam: state.updatedImageTeam
  }))

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const previewUrl = URL.createObjectURL(acceptedFiles[0])
      updatedImageTeam({
        imgFile: acceptedFiles[0],
        imgPreview: previewUrl
      })
    },
    [updatedImageTeam]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    if (imageTeam.imgFile) {
      URL.revokeObjectURL(imageTeam.imgPreview)
    }
  }, [imageTeam.imgFile])

  return (
    <div
      className={`bg-custom-lightgray w-full h-80 object-cover grid place-items-center rounded-xl cursor-pointer text-center text-2xl text-slate-900/40 ${
        isDragActive ? 'border-4 border-custom-blue' : 'border-2'
      }`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here ...</p>
      ) : imageTeam.imgFile ? (
        <Image
          src={URL.createObjectURL(imageTeam.imgFile)}
          alt='New image preview'
        />
      ) : imageTeam.imgPreview ? (
        <Image src={imageTeam.imgPreview} alt='Team shield image' />
      ) : (
        <p>Drop shield team image</p>
      )}
    </div>
  )
}

export default ImageDropzoneTeam
