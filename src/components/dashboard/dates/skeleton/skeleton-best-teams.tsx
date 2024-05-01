import { Card, CardBody, Skeleton } from '@nextui-org/react'

const SkeletonBestTeams = () => {
  return (
    <div>
      <h2 className='text-xl md:text-4xl font-bold text-center'>Best Teams</h2>
      <ol className='max-w-[400px] mx-auto flex flex-col gap-4 my-8'>
        {Array(3)
          .fill(0)
          .map((index) => (
            <li key={index}>
              <Card className={`bg-custom-darkblue border-2`}>
                <CardBody className='flex flex-row items-center gap-4 w-full text-custom-white px-4'>
                  <Skeleton className='w-full h-20 bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy rounded-lg' />
                </CardBody>
              </Card>
            </li>
          ))}
      </ol>
    </div>
  )
}

export default SkeletonBestTeams
