import { Skeleton } from '@nextui-org/react'

const TableSkeleton = () => {
  return (
    <div className='space-y-8 w-full'>
      <h2 className='text-xl lg:text-3xl font-bold text-center'>
        Groups Resume
      </h2>

      <ol className='w-full flex justify-center flex-wrap gap-8'>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <li
              key={index}
              className='w-full max-w-[594px] border-[1px] border-custom-lightgray rounded-lg overflow-hidden'
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
    </div>
  )
}

export default TableSkeleton
