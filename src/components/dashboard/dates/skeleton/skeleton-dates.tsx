import { Card, CardBody, Divider, Skeleton } from '@nextui-org/react'

const SkeletonDates = () => {
  return (
    <div>
      <h2 className='text-2xl xl:text-5xl font-bold text-center mb-5'>
        Date Matches
      </h2>

      <ol className='w-full grid grid-cols-2 gap-4'>
        {Array(20)
          .fill(0)
          .map((_, index) => (
            <>
              <li key={index} className=' grid grid-cols-4 gap-4'>
                <Card className='col-span-2 bg-custom-darkblue'>
                  <CardBody>
                    <Skeleton className='bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy rounded-lg h-8 w-full' />
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
                <Divider className='bg-custom-lightgray col-span-4' />
              </li>
            </>
          ))}
      </ol>
    </div>
  )
}

export default SkeletonDates
