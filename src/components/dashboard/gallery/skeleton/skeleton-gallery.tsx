import { Skeleton } from '@nextui-org/react'
import WrapperGallery from '@/components/dashboard/gallery/wrappers/wrapper-gallery'

const SkeletonGallery = () => {
  const arrayNumber = 5
  const skeletonArray = Array(arrayNumber).fill(null)

  return (
    <WrapperGallery>
      {skeletonArray.map((i) => (
        <Skeleton
          key={i}
          className='bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy aspect-square rounded-lg'
        />
      ))}
    </WrapperGallery>
  )
}

export default SkeletonGallery
