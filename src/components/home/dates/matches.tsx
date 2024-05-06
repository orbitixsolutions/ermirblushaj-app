import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'
import ErrorDates from '@/components/home/errors/error-dates'
import NoItems from '@/components/home/empty-items/no-items'
import prisma from '@/libs/prisma'

const getMatches = async () => {
  try {
    const matches = await prisma.match.findMany({
      where: {
        playStartDate: {
          notIn: null
        }
      },
      include: {
        teamA: true,
        teamB: true
      }
    })
    return { data: matches, status: 200, message: 'Success' }
  } catch (error: any) {
    return { data: null, status: 500, message: error.message }
  }
}

const Matches = async () => {
  const { data: matches, status } = await getMatches()

  if (!matches?.length) return <NoItems message='Comming Soon...' />

  if (status === 500) {
    return <ErrorDates message='Error loading data.' />
  }

  return (
    <div className='mx-auto max-w-full w-[480px] md:w-[640px] col-span-12 xl:col-span-4'>
      <ol className='grid grid-cols-4 gap-3'>
        {matches?.slice(0, 10).map((match) => {
          const date = match.playStartDate?.replaceAll('-', '/').split('T')[0]
          return (
            <li key={match.id} className='col-span-12'>
              <div className='grid grid-cols-3 gap-1 md:gap-3'>
                <Card className='bg-custom-darkblue text-custom-white p-2 sm:p-8 md:p-4'>
                  <CardBody>
                    <Avatar
                      size='lg'
                      src={match.teamA.logo!}
                      className='w-full h-full'
                    />
                  </CardBody>
                  <h2 className='text-center text-sm md:text-lg font-medium w-full'>
                    {match.teamA.name}
                  </h2>
                </Card>
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-xs md:text-lg text-custom-green'>{date}</p>
                  <p className='text-center font-bold'>VS</p>
                </div>
                <Card className='bg-custom-darkblue text-custom-white p-2 sm:p-8 md:p-4'>
                  <CardBody>
                    <Avatar
                      size='lg'
                      src={match.teamB.logo!}
                      className='w-full h-full'
                    />
                  </CardBody>
                  <h2 className='text-center text-sm md:text-lg font-medium w-full'>
                    {match.teamB.name}
                  </h2>
                </Card>
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
