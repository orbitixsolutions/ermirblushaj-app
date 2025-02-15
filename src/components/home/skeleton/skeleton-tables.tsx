import { Skeleton } from '@nextui-org/react'

const SkeletonTables = () => {
  return (
    <section className='max-w-[1440px] mx-auto py-8 md:py-16 px-5 text-custom-white'>
      <h2 className='w-full text-center text-lg md:text-2xl font-bold'>
        Groups Stage
      </h2>
      <ol className='grid grid-cols-8 gap-4 py-8'>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <li
              key={index}
              className='col-span-8 md:col-span-4 border-[1px] border-custom-lightgray rounded-lg overflow-hidden h-[371px]'
            >
              <h3 className='text-xl font-bold uppercase w-full bg-custom-green py-3 px-4 text-center text-custom-white'>
                <Skeleton className='h-10 rounded-md mx-auto max-w-[120px] bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy' />
              </h3>

              <ol className='flex flex-col gap-2 px-5 my-10'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <li key={index}>
                      <Skeleton className='h-10 rounded-md bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy' />
                    </li>
                  ))}
              </ol>
            </li>
          ))}
      </ol>
    </section>
  )
}

export default SkeletonTables
