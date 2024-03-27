import { Skeleton } from '@nextui-org/react'
import WrapperGallery from '@/components/gallery/wrappers/wrapper-gallery'

const SkeletonGallery = ({ isLoaded }: { isLoaded: boolean }) => {
  const arrayNumber = 5
  const skeletonArray = Array(arrayNumber).fill(null)

  return (
    <WrapperGallery>
      {skeletonArray.map((i) => (
        <Skeleton
          key={i}
          isLoaded={isLoaded}
          className='bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy aspect-square rounded-lg'
        />
      ))}
    </WrapperGallery>
  )
}

export default SkeletonGallery
