import { Skeleton } from '@nextui-org/react'
import WrapperNew from '@/components/new/wrappers/wrapper-new'

const SkeletonNew = () => {
  const arrayNumber = 5
  const skeletonArray = Array(arrayNumber).fill(null)

  return (
    <WrapperNew>
      {skeletonArray.map((i) => (
        <li key={i}>
          <Skeleton
            className='bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy aspect-square rounded-lg mb-2'
          />
          <Skeleton
            className='bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy rounded-lg'
          >
            <div className='w-full h-8'></div>
          </Skeleton>
        </li>
      ))}
    </WrapperNew>
  )
}

export default SkeletonNew
