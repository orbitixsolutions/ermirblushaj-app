import { storage } from '@/firebase/firebaseConfig'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'sonner'

interface Props {
  path: string
  id: string
}

export const deleteImage = async ({ path: path, id: id }: Props) => {
  const imageRef = ref(storage, `${path}/${id}`)
  await deleteObject(imageRef)
}
