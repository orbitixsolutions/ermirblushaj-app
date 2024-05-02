import { Card } from '@nextui-org/react'

const ErrorTeams = ({ message }: { message: string }) => {
  return (
    <section className='max-w-[640px] mx-auto py-8 md:py-24 px-5 text-custom-white space-y-4'>
      <Card className='py-8  grid place-items-center border-2 border-custom-red bg-custom-red/30'>
        <h2 className='text-xl font-bold text-center text-custom-red/75'>
          {message}
        </h2>
      </Card>
    </section>
  )
}

export default ErrorTeams
