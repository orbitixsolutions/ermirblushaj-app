import { Card } from '@nextui-org/react'

const ErrorAlert = ({message}: {message: string}) => {
  return (
    <Card className='col-span-12 lg:col-span-4 grid place-items-center py-8 border-2 border-custom-red bg-custom-red/30'>
      <h2 className='text-xl font-bold text-center text-custom-red/75'>
        {message}
      </h2>
    </Card>
  )
}

export default ErrorAlert