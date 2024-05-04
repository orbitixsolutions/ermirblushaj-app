import { updatedMatchKeyDate } from '@/actions/services/edit'
import { MatchKey, Team } from '@prisma/client'
import { useEffect, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, DatePicker } from '@nextui-org/react'
import { dataMatchesKeysById } from '@/actions/services/data'
import { IconCheck, IconX } from '@tabler/icons-react'
import { parseDate } from '@internationalized/date'
import { toast } from 'sonner'
import { mutate } from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const FormMatchDate = ({
  match,
  phase,
  column,
  setIsOpen
}: {
  match: ExtendedMatchKey
  phase: string
  column: string
  setIsOpen: () => void
}) => {
  const matchId = match.id
  const date = match.playStartDate

  const [isPending, startTransition] = useTransition()
  const { handleSubmit, control, setValue } = useForm()

  useEffect(() => {
    if (!date) return

    if (matchId) {
      startTransition(() => {
        dataMatchesKeysById(match.id).then((res) => {
          const data = res.data!
          if (!data.playStartDate) return

          const date = parseDate(data.playStartDate!)
          setValue('date', date)
        })
      })
    }
  }, [])

  const onSubmit = handleSubmit((data) => {
    const matchId = match.id

    const { date } = data
    const { year, month, day } = date

    const newDate = new Date(year, month - 1, day)
    const formattedDate = newDate.toISOString().split('T')[0]

    startTransition(async () => {
      const { status, message } = await updatedMatchKeyDate(
        matchId,
        formattedDate
      )

      if (status === 200) {
        setIsOpen()
        mutate(`/api/matches/keys?column=${column}&phase=${phase}`)
        toast.success(message)
        return
      }

      toast.error('An ocurred a error!')
      return
    })
  })

  return (
    <form onSubmit={onSubmit} className='w-full flex gap-2'>
      <Controller
        name='date'
        control={control}
        render={({ field }) => (
          <DatePicker isDisabled={isPending} className='flex-1' {...field} />
        )}
      />

      <Button
        isIconOnly
        type='submit'
        color='success'
        className='bg-custom-green'
        isLoading={isPending}
      >
        <IconCheck />
      </Button>
      <Button
        isIconOnly
        type='button'
        color='danger'
        className='bg-custom-red'
        onPress={() => setIsOpen()}
      >
        <IconX />
      </Button>
    </form>
  )
}

export default FormMatchDate
