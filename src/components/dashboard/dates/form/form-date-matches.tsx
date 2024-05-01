import { setDatePlay } from '@/actions/services/edit'
import { Button, Input } from '@nextui-org/react'
import { IconCheck, IconX } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { Match, Team } from '@prisma/client'
import { useEffect, useState } from 'react'
import useMatches from '@/hooks/matches-hooks/use-matches'
import axios from 'axios'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const FormDateMatches = ({ match }: { match: ExtendedMatch }) => {
  const [isPending, setIsPending] = useState(false)

  const { control, handleSubmit, handleClear, disableIsActive, setValue } =
    useMatches()

  useEffect(() => {
    if (match.id) {
      setIsPending(true)
      axios.get(`/api/matches/${match.id}`).then((res) => {
        const playStartDate = res.data.playStartDate
        const value = playStartDate ? playStartDate : ''

        setValue('play_start_date', value)
        setIsPending(false)
      })
    }
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    if (data.play_start_date === '') {
      return toast.info('Set a date play!')
    }
    setIsPending(true)
    const res = await setDatePlay(match.id, data)

    if (res.status === 200) {
      handleClear()
      setIsPending(false)
      return toast.success('Changes saved!')
    }

    handleClear()
    return toast.error('An ocurred a error!')
  })

  return (
    <form onSubmit={onSubmit} className='w-full flex space-x-2'>
      <Controller
        name='play_start_date'
        control={control}
        render={({ field }) => (
          <Input
            size='sm'
            type='datetime-local'
            placeholder='Enter date play'
            isDisabled={isPending}
            {...field}
          />
        )}
      />

      <Button
        isIconOnly
        isLoading={isPending}
        size='sm'
        type='submit'
        className='bg-custom-green text-xl font-bold'
      >
        <IconCheck size={20} />
      </Button>
      <Button
        onPress={() => disableIsActive()}
        isIconOnly
        size='sm'
        className='bg-custom-red text-xl font-bold'
      >
        <IconX size={20} />
      </Button>
    </form>
  )
}

export default FormDateMatches
