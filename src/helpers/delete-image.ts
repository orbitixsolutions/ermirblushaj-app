import { storage } from '@/firebase/firebaseConfig'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'sonner'

interface Props {
  path: string
  id: string
}

export const deleteImage = async ({ path: path, id: id }: Props) => {
  try {
    const imageRef = ref(storage, `${path}/${id}`)
    await deleteObject(imageRef)
  } catch (error: any) {
    if (error.code === 'storage/object-not-found') {
      toast.error('No found this image!')
      return { status: 400, errorMessage: 'No found this image.' }
    }
    
    toast.error('An ocurred a error!')
    return { status: 400, errorMessage: 'An ocurred a error!' }
  }
}
