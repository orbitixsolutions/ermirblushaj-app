import { Button, Card, Skeleton } from '@nextui-org/react'

const SkeletonGallery = () => {
  return (
    <div className='w-[320px] mx-auto rounded-md overflow-hidden'>
      <div className='bg-custom-green w-full py-2'>
        <h2 className='text-xs text-center font-bold text-slate-950'>
          Gallery
        </h2>
      </div>
      <ol className='grid grid-cols-3'>
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <li key={index}>
              <Card radius='none' className='col-span-1 aspect-square'>
                <Skeleton className='bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy aspect-square rounded-none' />
              </Card>
            </li>
          ))}
      </ol>
      <div>
        <Button
          fullWidth
          isLoading
          radius='none'
          size='sm'
          className='bg-custom-blue font-bold text-xs'
        >
          See more
        </Button>
      </div>
    </div>
  )
}

export default SkeletonGallery
