import { fetcher } from '@/helpers/fetcher'
import { Match } from '@prisma/client'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner
} from '@nextui-org/react'
import ButtonCreateGroups from '@/components/dashboard/dates/buttons/options/create/button-create-groups'
import ButtonCreateMatches from '@/components/dashboard/dates/buttons/options/create/button-create-matches'
import ButtonCreateKeys from '@/components/dashboard/dates/buttons/options/create/button-create-keys'
import ButtonFinishGroupStage from '@/components/dashboard/dates/buttons/options/button-finish-group-stage'
import useSWR from 'swr'

const DateGeneralOptions = () => {
  const {
    data: matches,
    isLoading,
    error
  } = useSWR<Match[]>('/api/matches', fetcher)

  if (error) return <p>An ocurred a error!</p>
  if (isLoading) return <Spinner />

  const ALL_MATCHES_COMPLETED = matches?.every(
    (matchup) => matchup.status === 'COMPLETED'
  )

  return (
    <div className='flex flex-col gap-5'>
      <Card className='w-full xl:w-[325px] bg-custom-darkblue text-custom-white'>
        <CardHeader>
          <h3 className='mx-auto text-2xl xl:text-4xl font-bold'>Groups Fase</h3>
        </CardHeader>
        <CardBody>
          <p className='text-center'>Automatically organize groups</p>
          <p className='text-center'>with the push of a button.</p>
        </CardBody>
        <CardFooter>
          <ButtonCreateGroups />
        </CardFooter>
      </Card>
      <Card className='w-full xl:w-[325px] bg-custom-darkblue text-custom-white'>
        <CardHeader>
          <h3 className='mx-auto text-2xl xl:text-4xl font-bold'>Generate Dates</h3>
        </CardHeader>
        <CardBody>
          <p className='text-center'>Create matches in an organized way</p>
          <p className='text-center'>in a simple way.</p>
        </CardBody>
        <CardFooter>
          <ButtonCreateMatches />
        </CardFooter>
      </Card>
      {!ALL_MATCHES_COMPLETED && (
        <Card className='w-full xl:w-[325px] bg-custom-darkblue text-custom-white'>
          <CardHeader>
            <h3 className='mx-auto text-2xl xl:text-4xl font-bold'>Finished Stage</h3>
          </CardHeader>
          <CardBody>
            <p className='text-center'>This will end the group</p>
            <p className='text-center'>phases and then generate the keys.</p>
          </CardBody>
          <CardFooter>
            <ButtonFinishGroupStage />
          </CardFooter>
        </Card>
      )}
      {ALL_MATCHES_COMPLETED && (
        <Card className='w-full xl:w-[325px] bg-custom-darkblue text-custom-white'>
          <CardHeader>
            <h3 className='mx-auto text-2xl xl:text-4xl font-bold'>Generate Key</h3>
          </CardHeader>
          <CardBody>
            <p className='text-center'>Generates keys in an organized way</p>
            <p className='text-center'>in a simple way (the dates of</p>
            <p className='text-center'>calendar can be manual)</p>
          </CardBody>
          <CardFooter>
            <ButtonCreateKeys />
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

export default DateGeneralOptions
