import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import ButtonCreateGroups from '@/components/dates/buttons/options/button-create-groups'
import ButtonCreateMatches from '@/components/dates/buttons/options/button-create-matches'

const DateGeneralOptions = () => {
  return (
    <div className='flex flex-col gap-5'>
      <Card className='w-[400px] bg-custom-darkblue text-custom-white'>
        <CardHeader>
          <h3 className='mx-auto text-4xl font-bold'>Groups Fase</h3>
        </CardHeader>
        <CardBody>
          <p className='text-center'>Automatically organize groups</p>
          <p className='text-center'>with the push of a button.</p>
        </CardBody>
        <CardFooter>
          <ButtonCreateGroups />
        </CardFooter>
      </Card>
      <Card className='w-[400px] bg-custom-darkblue text-custom-white'>
        <CardHeader>
          <h3 className='mx-auto text-4xl font-bold'>Generate Dates</h3>
        </CardHeader>
        <CardBody>
          <p className='text-center'>Create matches in an organized way</p>
          <p className='text-center'>in a simple way (the dates of</p>
          <p className='text-center'>calendar can be manual)</p>
        </CardBody>
        <CardFooter>
          <ButtonCreateMatches />
        </CardFooter>
      </Card>
    </div>
  )
}

export default DateGeneralOptions
