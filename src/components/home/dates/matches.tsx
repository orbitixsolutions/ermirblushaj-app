import prisma from '@/libs/prisma'
import { Avatar, Card, CardBody, Divider } from '@nextui-org/react'

const getMatches = async () => {
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
    // take: 10
  })
  return matches
}

const Matches = async () => {
  const matches = await getMatches()

  return (
    <div className='col-span-12 lg:col-span-6 xl:col-span-4'>
      <ol className='grid grid-cols-3 gap-3'>
        {matches?.slice(0, 10).map((match) => {
          const date = match.playStartDate?.replaceAll('-', '/').split('T')[0]
          return (
            <>
              <li key={match.id} className='col-span-3 grid grid-cols-3 gap-3'>
                <Card className='bg-custom-darkblue aspect-square grid place-items-center text-custom-white'>
                  <CardBody className='space-y-2'>
                    <Avatar
                      src={match.teamA.logo!}
                      className='mx-auto w-8 h-8 xs:w-16 xs:h-16'
                    />
                    <h2 className='text-xs md:text-lg font-bold text-center'>
                      {match.teamA.name}
                    </h2>
                  </CardBody>
                </Card>
                <div className='flex flex-col items-center justify-center'>
                  <p className='text-xs md:text-lg text-custom-green'>{date}</p>
                  <p className='text-center font-bold'>VS</p>
                </div>
                <Card className='bg-custom-darkblue aspect-square grid place-items-center text-custom-white'>
                  <CardBody className='space-y-2'>
                    <Avatar
                      src={match.teamB.logo!}
                      className='mx-auto w-8 h-8 xs:w-16 xs:h-16'
                    />
                    <h2 className='text-xs md:text-lg font-bold text-center'>
                      {match.teamA.name}
                    </h2>
                  </CardBody>
                </Card>
              </li>
              <Divider
                orientation='horizontal'
                className='bg-custom-lightgray my-2 col-span-3'
              />
            </>
          )
        })}
      </ol>
    </div>
  )
}

export default Matches
