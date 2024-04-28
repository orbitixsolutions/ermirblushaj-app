import { fetcher } from '@/helpers/fetcher'
import { Avatar, Card, CardBody } from '@nextui-org/react'
import { Team } from '@prisma/client'
import useSWR from 'swr'

const borderColors = {
  0: 'border-yellow-400',
  1: 'border-gray-400',
  2: 'border-orange-600'
}

const BestTeams = () => {
  const {
    data: bestTeams,
    isLoading,
    error
  } = useSWR<Team[]>('/api/matches/keys/top', fetcher)

  if (error) return <p>Error</p>
  if (isLoading) return <p>Loading...</p>

  if (bestTeams?.length === 0) return


  return (
    <div>
      <h2 className='text-3xl font-bold text-center'>Best Teams</h2>
      <ol className='w-full flex flex-col items-center gap-4 my-8'>
        {bestTeams?.map((team, index) => (
          <li key={team.id} className='flex'>
            <Card
              className={`bg-custom-darkblue border-2 ${
                borderColors[index as keyof typeof borderColors] ||
                'border-gray-600'
              }`}
            >
              <CardBody>
                <Avatar size='lg' src={team.logo!} />
              </CardBody>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default BestTeams
