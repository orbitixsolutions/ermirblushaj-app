import { Card } from '@nextui-org/react'

const NoMatches = ({ message }: { message: string }) => {
  return (
    <Card className='grid place-items-center py-8 border-2 border-custom-green bg-custom-green/30'>
      <h2 className='text-xl font-bold text-center text-custom-green/75'>
        {message}
      </h2>
    </Card>
  )
}

export default NoMatches
