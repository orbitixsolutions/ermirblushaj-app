import { Card, CardBody, Divider, Skeleton } from '@nextui-org/react'

const SkeletonDates = () => {
  return (
    <div className='flex justify-between'>
      <div className='w-[400px]'>
        <h2 className='text-5xl font-bold mb-5 text-center'>Dates</h2>

        <ol className='w-full'>
          {Array(40)
            .fill(0)
            .map((_, index) => (
              <>
                <li key={index} className='grid grid-cols-4 gap-4 p-4'>
                  <Card className='col-span-2 bg-custom-darkblue'>
                    <CardBody>
                      <Skeleton className=' bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy rounded-lg h-8 w-full' />
                    </CardBody>
                  </Card>
                  <Card className='col-span-2 bg-custom-darkblue'>
                    <CardBody>
                      <Skeleton className=' bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy rounded-lg h-8 w-full' />
                    </CardBody>
                  </Card>
                  <Card className='col-span-4 bg-custom-darkblue'>
                    <CardBody>
                      <Skeleton className=' bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy rounded-lg h-8 w-full' />
                    </CardBody>
                  </Card>
                </li>
                <Divider className='bg-custom-lightgray' />
              </>
            ))}
        </ol>
      </div>
    </div>
  )
}

export default SkeletonDates
