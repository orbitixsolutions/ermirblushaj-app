import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { IconAlertCircle } from '@tabler/icons-react'

const ErrorDates = ({ message }: { message: string }) => {
  return (
    <div className='col-span-12 lg:col-span-4'>
      <Card className=' grid place-items-center p-8 border-2 border-custom-red bg-custom-red/30'>
        <CardBody>
          <IconAlertCircle size={48} className='text-center w-full text-custom-red/75 mb-4 animate-pulse' />
          <h2 className='text-xl font-bold text-center text-custom-red/75'>
            {message}
          </h2>
        </CardBody>
      </Card>
    </div>
  )
}

export default ErrorDates
