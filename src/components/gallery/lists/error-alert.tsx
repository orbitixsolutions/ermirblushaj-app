import { Card } from '@nextui-org/react'

const ErrorAlert = () => {
  return (
    <Card className='bg-custom-red/30 border-2 border-custom-red p-8 rounded-xl'>
      <h2 className='text-base md:text-xl text-custom-red/75 text-center font-bold '>
        Data could not be loaded.
      </h2>
    </Card>
  )
}

export default ErrorAlert
