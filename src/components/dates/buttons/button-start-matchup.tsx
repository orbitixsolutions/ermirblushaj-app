import { Button } from '@nextui-org/react'
import { IconPointFilled } from '@tabler/icons-react'

const ButtonStartMatchup = () => {
  return (
    <div className='w-full grid grid-cols-2 gap-2'>
      <div className='col-span-2 flex items-center'>
        <Button
          size='sm'
          fullWidth
          className='bg-custom-darkblue font-bold text-custom-white'
        >
          Today
        </Button>
        <div className='flex'>
          <IconPointFilled className='text-custom-green animate-pulse' />
          <p>Live</p>
        </div>
      </div>
      <Button
        size='sm'
        fullWidth
        className='col-span-2 bg-custom-green w-full rounded-lg cursor-pointer text-sm font-bold'
      >
        Finish matchup
      </Button>
    </div>
  )
}

export default ButtonStartMatchup
