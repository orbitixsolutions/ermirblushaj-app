import { Card } from '@nextui-org/react'

const SkeletonError = () => {
  return (
    <Card className='my-8 p-8 text-center border-2 border-custom-red bg-custom-red/30'>
      <h2 className='text-xl md:text-4xl font-bold text-custom-red/75'>
        Data could not be loaded.
      </h2>
      <h2 className='text-xl md:text-4xl font-bold text-custom-red/75'>
        Try more later.
      </h2>
    </Card>
  )
}

export default SkeletonError
