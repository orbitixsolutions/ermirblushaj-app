import { Avatar, Card, Skeleton } from '@nextui-org/react'

const SkeletonTeams = () => {
  return (
    <section className='max-w-[1200px] mx-auto py-8 md:py-24 px-5 text-custom-white space-y-4'>
      <h2 className='w-full text-center font-bold'>Teams</h2>
      <ol className='grid grid-cols-5 rounded-md overflow-hidden border-[1px]'>
        {Array(20)
          .fill(0)
          .map((_, index) => {
            const isLastItem = index === 20 - 0
            const isSpecialItem = index % 5 === 0 || isLastItem
            const borderClass = isSpecialItem ? '' : 'border-l-[1px]'
            return (
              <li
                key={index}
                className={`aspect-square border-custom-lightgray ${borderClass}`}
              >
                <Card
                  radius='none'
                  className={`bg-transparent size-full grid place-items-center ${
                    index >= 20 - 20 && index <= 20 - 16
                      ? 'border-b-[1px]'
                      : 'border-b-[1px] border-t-[1px]'
                  }`}
                >
                  <Avatar />
                </Card>
                <Skeleton className='h-5 rounded-none bg-custom-navy before:bg-gradient-r before:from-custom-navy before:border-custom-navy before:via-custom-darkblue before:to-custom-navy' />
              </li>
            )
          })}
      </ol>
    </section>
  )
}

export default SkeletonTeams
