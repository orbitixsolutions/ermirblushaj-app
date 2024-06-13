import { Avatar, Card, CardBody, Divider, Tooltip } from '@nextui-org/react'
import ErrorDates from '@/components/home/errors/error-dates'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'

const getMatches = async () => {
  try {
    const matches = await prisma.match.findMany({
      where: {
        status: {
          equals: 'LIVE'
        }
      },
      include: {
        teamA: true,
        teamB: true
      }
    })

    console.log(matches)

    return { data: matches, status: 200, message: 'Success' }
  } catch (error: any) {
    return { data: null, status: 500, message: error.message }
  }
}

const Matches = async () => {
  const { data: matches, status } = await getMatches()

  const EMPTY_MACTHES = !matches?.length
  if (EMPTY_MACTHES) return

  if (status === 500) {
    return <ErrorDates message='Error loading data.' />
  }

  return (
    <div
      id='dates'
      className='mx-auto max-w-full w-[480px] md:w-[640px] col-span-12 xl:col-span-4'
    >
      <ol className='grid grid-cols-4 gap-3'>
        {matches?.slice(0, 10).map((match) => {
          const date = new Date(match.playStartDate!)
          const formattedDate = date.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          })

          return (
            <li key={match.id} className='col-span-12'>
              <div className='grid grid-cols-3 gap-1 md:gap-3'>
                <Tooltip
                  placement='bottom'
                  className='bg-custom-darknavy rounded-md px-4'
                  content={
                    <h2 className='text-center text-sm md:text-lg font-medium w-full capitalize line-clamp-1 text-custom-white'>
                      {match.teamA.name}
                    </h2>
                  }
                >
                  <Card className='bg-custom-darkblue text-custom-white p-2 sm:p-8 md:p-4'>
                    <CardBody>
                      <Avatar
                        size='lg'
                        src={match.teamA.logo!}
                        className='w-full h-full aspect-square object-cover'
                      />
                    </CardBody>
                    <h2 className='text-center text-sm md:text-lg font-medium w-full capitalize line-clamp-1'>
                      {match.teamA.name}
                    </h2>
                  </Card>
                </Tooltip>
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-xs md:text-lg text-custom-green'>
                    {formattedDate}
                  </p>
                  <p className='text-center font-bold'>VS</p>
                </div>
                <Tooltip
                  placement='bottom'
                  className='bg-custom-darknavy rounded-md px-4'
                  content={
                    <h2 className='text-center text-sm md:text-lg font-medium w-full capitalize line-clamp-1 text-custom-white'>
                      {match.teamB.name}
                    </h2>
                  }
                >
                  <Card className='bg-custom-darkblue text-custom-white p-2 sm:p-8 md:p-4'>
                    <CardBody>
                      <Avatar
                        size='lg'
                        src={match.teamB.logo!}
                        className='w-full h-full aspect-square object-cover'
                      />
                    </CardBody>
                    <h2 className='text-center text-sm md:text-lg font-medium w-full capitalize line-clamp-1'>
                      {match.teamB.name}
                    </h2>
                  </Card>
                </Tooltip>
              </div>
              <Divider
                orientation='horizontal'
                className='bg-custom-lightgray my-2 col-span-12'
              />
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Matches
