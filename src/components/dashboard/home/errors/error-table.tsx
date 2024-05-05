import { Card } from '@nextui-org/react'

const ErrorTable = () => {
  return (
   <div className='col-span-11 my-8'>
     <Card className='p-8 text-center border-2 border-custom-red bg-custom-red/30'>
      <h2 className='text-lg md:text-2xl font-bold text-custom-red/75'>
        Data could not be loaded.
      </h2>
      <h2 className='text-lg md:text-2xl font-bold text-custom-red/75'>Try more later.</h2>
    </Card>
   </div>
  )
}

export default ErrorTable
