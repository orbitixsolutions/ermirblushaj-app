import { Card } from '@nextui-org/react'

const ErrorGallery = () => {
  return (
    <Card className='w-[320px] grid place-items-center py-8 border-2 border-custom-red bg-custom-red/30'>
      <h2 className='text-xl font-bold text-center text-custom-red/75'>
        Error loading gallery.
      </h2>
    </Card>
  )
}

export default ErrorGallery
