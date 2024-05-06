import { Card, CardBody } from '@nextui-org/react'
import { IconAlertCircle } from '@tabler/icons-react'

const ErrorMatches = ({ message }: { message: string }) => {
  return (
    <Card className=' grid place-items-center p-8 border-2 border-custom-red bg-custom-red/30'>
      <CardBody>
        <IconAlertCircle
          size={48}
          className='text-center w-full text-custom-red/75 mb-4 animate-pulse'
        />
        <h2 className='text-xl font-bold text-center text-custom-red/75'>
          {message}
        </h2>
      </CardBody>
    </Card>
  )
}

export default ErrorMatches
