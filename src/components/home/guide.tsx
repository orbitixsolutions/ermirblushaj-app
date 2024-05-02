import { Button } from '@nextui-org/react'

const Guide = () => {
  return (
    <section className='max-w-[1024px] mx-auto py-8 md:py-24 px-5 flex flex-wrap'>
      <div className='space-y-16 w-full text-custom-white'>
        <h2 className='text-xl font-bold text-center mt-8'>
          How the tournament works?
        </h2>

        <div className='space-y-4'>
          <h2 className='text-center font-bold'>Keys</h2>
          <p className='text-center text-pretty text-xs'>
            Lorem ipsum dolor sit amet consectetur. Sem placerat quam etiam
            molestie ve morbi ac tellus nulla. Auctor massa feugiat purus ac et.
          </p>

          <div className='flex justify-center'>
            <Button radius='full' className='bg-custom-green font-bold'>
              See keys
            </Button>
          </div>
        </div>

        <div className='space-y-4'>
          <h2 className='text-center font-bold'>Teams</h2>
          <p className='text-center text-pretty text-xs'>
            Lorem ipsum dolor sit amet consectetur. Sem placerat quam etiam
            molestie ve morbi ac tellus nulla. Auctor massa feugiat purus ac et.
          </p>

          <div className='flex justify-center'>
            <Button radius='full' className='bg-custom-green font-bold'>
              See teams
            </Button>
          </div>
        </div>

        <div className='space-y-4'>
          <h2 className='text-center font-bold'>Dates</h2>
          <p className='text-center text-pretty text-xs'>
            Lorem ipsum dolor sit amet consectetur. Sem placerat quam etiam
            molestie ve morbi ac tellus nulla. Auctor massa feugiat purus ac et.
          </p>

          <div className='flex justify-center'>
            <Button radius='full' className='bg-custom-green font-bold'>
              See dates
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide
