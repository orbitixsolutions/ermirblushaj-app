import { Card, CardBody, Divider, Skeleton } from '@nextui-org/react'

const SkeletonDates = () => {
  return (
    <div className='grid grid-cols-8 space-y-20 xl:space-y-0'>
      <div className='col-span-8 xl:col-span-2'>
        <h2 className='text-5xl font-bold mb-5 text-center'>Dates</h2>

        <ol className='grid grid-cols-8 gap-4'>
          {Array(40)
            .fill(0)
            .map((_, index) => (
              <>
                <li key={index} className='grid grid-cols-4 col-span-8 gap-4'>
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
                <Divider className='bg-custom-lightgray col-span-8' />
              </>
            ))}
        </ol>
      </div>
    </div>
  )
}

export default SkeletonDates
