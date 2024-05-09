import { setDatePlay } from '@/actions/services/edit'
import { Button, DatePicker } from '@nextui-org/react'
import { IconCheck, IconX } from '@tabler/icons-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Match, Team } from '@prisma/client'
import { useEffect, useTransition } from 'react'
import { dataMatchesById } from '@/actions/services/data'
import { mutate } from 'swr'
import { parseDate } from '@internationalized/date'
import useMatches from '@/hooks/matches-hooks/use-matches'

type ExtendedMatch = Match & {
  teamA: Team
  teamB: Team
}

const FormDateMatches = ({ match }: { match: ExtendedMatch }) => {
  const matchId = match.id
  const date = match.playStartDate

  const [isPending, startTransition] = useTransition()
  const { control, handleSubmit, setValue } = useForm()

  const { disableIsActive } = useMatches()

  useEffect(() => {
    if (!date) return

    if (matchId) {
      startTransition(() => {
        dataMatchesById(match.id).then((res) => {
          const data = res.data!
          if (!data.playStartDate) return

          const date = parseDate(data.playStartDate!)
          setValue('date', date)
        })
      })
    }
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    const { date } = data
    const { year, month, day } = date

    const newDate = new Date(year, month - 1, day)
    const formattedDate = newDate.toISOString().split('T')[0]

    startTransition(async () => {
      const { status, message } = await setDatePlay(matchId, formattedDate)
      disableIsActive()

      if (status === 200) {
        mutate('/api/matches')
        toast.success(message)
        return
      }

      toast.error(message)
      return
    })
  })

  return (
    <form onSubmit={onSubmit} className='w-full flex space-x-2'>
      <Controller
        name='date'
        control={control}
        render={({ field }) => (
          <DatePicker isDisabled={isPending} className='flex-1' {...field} />
        )}
      />

      <Button
        isIconOnly
        isLoading={isPending}
        type='submit'
        className='bg-custom-green text-xl font-bold'
      >
        <IconCheck size={20} />
      </Button>
      <Button
        onPress={() => disableIsActive()}
        isIconOnly
        className='bg-custom-red text-xl font-bold'
      >
        <IconX size={20} />
      </Button>
    </form>
  )
}

export default FormDateMatches
