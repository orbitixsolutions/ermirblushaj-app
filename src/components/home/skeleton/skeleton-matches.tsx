import { Card, Skeleton } from '@nextui-org/react'

const SkeletonMatches = () => {
  return (
    <div className='w-[320px] mx-auto'>
      <h2 className='text-center font-bold'>Matches</h2>

      <ol className='grid-cols-3 py-5'>
        {Array(3)
          .fill(0)
          ?.map((match) => (
            <li
              key={match.id}
              className='col-span-3 flex space-y-2 items-center justify-around'
            >
              <Card className='bg-custom-darkblue p-2'>
                <Skeleton className='size-16 bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy rounded-lg' />
              </Card>
              <div>
                <Skeleton className='h-5 w-[64px] bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy aspect-square rounded-none' />
                <p className='text-center font-bold'>VS</p>
              </div>
              <Card className='bg-custom-darkblue p-2'>
                <Skeleton className='size-16 bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy rounded-lg' />
              </Card>
            </li>
          ))}
      </ol>
    </div>
  )
}

export default SkeletonMatches
