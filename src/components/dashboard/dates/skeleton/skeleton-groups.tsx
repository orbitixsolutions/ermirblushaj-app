import { Card, Skeleton } from '@nextui-org/react'

const SkeletonGroups = () => {
  return (
    <ol className='grid grid-cols-8 gap-4 py-4'>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <li
            className='col-span-8 lg:col-span-4 bg-custom-darknavy p-5 rounded-lg'
            key={index}
          >
            <h3 className='text-3xl font-bold uppercase text-custom-green mb-4'>
              <Skeleton className='max-w-[120px] h-8 bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy rounded-lg' />
            </h3>

            <ol className='grid grid-cols-6 md:grid-cols-5 gap-4'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <li key={index} className='col-span-3 xs:col-span-2 md:col-span-1'>
                    <Skeleton className='bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy aspect-square rounded-lg mb-3' />
                    <Skeleton className='bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy rounded-lg'>
                      <div className='w-full h-8'></div>
                    </Skeleton>
                  </li>
                ))}
            </ol>
          </li>
        ))}
    </ol>
  )
}

export default SkeletonGroups
