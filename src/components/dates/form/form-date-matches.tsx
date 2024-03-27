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

const FormDateMatches = ({ item }: { item: ExtendedMatch }) => {
  const [isPending, setIsPending] = useState(false)

  const { control, handleSubmit, handleClear, disableIsActive, setValue } =
    useMatches()

  useEffect(() => {
    setIsPending(true)
    if (item.id) {
      axios.get(`/api/matches/${item.id}`).then((res) => {
        const playDate = res.data.playDate
        const value = playDate ? playDate : ''

        setValue('play_date', value)
        setIsPending(false)
      })
    }
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    if (data.play_date === '') {
      return toast.info('Set a date play!')
    }
    setIsPending(true)
    const res = await setDatePlay(item.id, data)

    if (res.status === 200) {
      handleClear()
      setIsPending(false)
      return toast.success('Changes saved!')
    }

    handleClear()
    return toast.error('An ocurred a error!')
  })

  return (
    <form onSubmit={onSubmit} className='col-span-4 flex gap-2'>
      <Controller
        name='play_date'
        control={control}
        render={({ field }) => (
          <Input
            size='sm'
            type='datetime-local'
            placeholder='Enter date play'
            isDisabled={isPending}
            className='col-span-3 text-slate-950'
            {...field}
          />
        )}
      />

      <Button
        isIconOnly
        isLoading={isPending}
        size='sm'
        type='submit'
        className='col-span-1 bg-custom-green text-xl font-bold'
      >
        <IconCheck size={20} />
      </Button>
      <Button
        onPress={() => disableIsActive()}
        isIconOnly
        size='sm'
        className='col-span-1 bg-custom-red text-xl font-bold'
      >
        <IconX size={20} />
      </Button>
    </form>
  )
}

export default FormDateMatches
