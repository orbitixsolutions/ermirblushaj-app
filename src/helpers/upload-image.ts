import { updateLogo } from '@/actions/update-logo'
import { storage } from '@/firebase/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { toast } from 'sonner'

interface Props {
  path: string
  id: string
  imgFile: File | null
}

export const uploadImage = ({
  path: path,
  id: id,
  imgFile: imgFile
}: Props) => {
  try {
    const metadata = { contentType: 'image/webp' }
    const imageRef = ref(storage, `${path}/${id}`)
    if (!imgFile) return

    return uploadBytes(imageRef, imgFile, metadata).then(async () => {
      const downloadUrl = await getDownloadURL(imageRef)
      await updateLogo({ path: path, id: id, imgUrl: downloadUrl })
    })
  } catch (error) {
    toast.error('An ocurred a error!')
  }
}
