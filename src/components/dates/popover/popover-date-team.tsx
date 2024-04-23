import {
  updatedMatchKeyDate,
  updatedMatchKeyStatus
} from '@/actions/services/edit'
import { MatchKey, Team } from '@prisma/client'
import { useEffect, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Button,
  DatePicker,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@nextui-org/react'
import { dataMatchesKeysById } from '@/actions/services/data'
import { IconCheck, IconSettings, IconX } from '@tabler/icons-react'
import { parseDate } from '@internationalized/date'
import { mutate } from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}
const PopoverMatchDate = ({
  group,
  match
}: {
  group: string
  match: ExtendedMatchKey
}) => {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  const isCurrentDate = (date: string) => {
    const current = new Date()
    const target = new Date(date)

    return (
      current.getFullYear() === target.getFullYear() &&
      current.getMonth() + 1 === target.getMonth() + 1 &&
      current.getDate() === target.getDate() + 1
    )
  }

  const toggleOpen = () => {
    if (isCurrentDate(match.playStartDate!)) return
    setIsOpen((prev) => !prev)
  }

  const finishMatchup = () => {
    startTransition(async () => {
      const { status, message } = await updatedMatchKeyStatus(
        match.id,
        'COMPLETED'
      )

      if (status === 200) {
        toast.success(message)
        mutate(`/api/matches/keys/${group}`)
        return
      }

      toast.error('An occurred error while finishing matchup!')
      return
    })
  }

  return (
    <Popover placement='bottom' showArrow={true}>
      <PopoverTrigger>
        <Button isIconOnly className='bg-custom-blue'>
          <IconSettings size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] flex flex-col gap-4 p-4 bg-custom-darknavy'>
        {!isOpen ? (
          isCurrentDate(match.playStartDate!) ? (
            <>
              {match.status === 'COMPLETED' ? (
                <Button fullWidth className='font-bold bg-custom-darkblue '>
                  <IconCheck className='text-custom-green' size={24} />
                  <span className='text-custom-green'>Finished</span>
                </Button>
              ) : (
                <>
                  <Button
                    fullWidth
                    onPress={toggleOpen}
                    className='font-bold bg-custom-darkblue'
                  >
                    <IconCheck size={24} />
                    Today
                  </Button>
                  <Button
                    fullWidth
                    isLoading={isPending}
                    onPress={finishMatchup}
                    className='font-bold bg-custom-green'
                  >
                    Finish matchup
                  </Button>
                </>
              )}
            </>
          ) : match.playStartDate === null ? (
            <Button
              fullWidth
              onPress={toggleOpen}
              className='font-bold bg-custom-darkblue'
            >
              No date
            </Button>
          ) : (
            <Button
              fullWidth
              onPress={toggleOpen}
              className='font-bold bg-custom-darkblue'
            >
              {match.playStartDate.replaceAll('-', '/')}
            </Button>
          )
        ) : (
          <FormMatchDate group={group} match={match} setIsOpen={toggleOpen} />
        )}
      </PopoverContent>
    </Popover>
  )
}
export default PopoverMatchDate

const FormMatchDate = ({
  match,
  group,
  setIsOpen
}: {
  match: ExtendedMatchKey
  group: string
  setIsOpen: () => void
}) => {
  const [isPending, startTransition] = useTransition()
  const { handleSubmit, control, setValue } = useForm()

  useEffect(() => {
    if (match.id) {
      startTransition(() => {
        dataMatchesKeysById(match.id).then((res) => {
          const data = res.data!
          if (!data.playStartDate) return

          const date = parseDate(data.playStartDate!)
          setValue('date', date)
        })
      })
    }
  }, [match])

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
        mutate(`/api/matches/keys/${group}`)
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

      <Button isIconOnly type='submit' color='success' isLoading={isPending}>
        <IconCheck />
      </Button>
      <Button
        isIconOnly
        type='button'
        color='danger'
        onPress={() => setIsOpen()}
      >
        <IconX />
      </Button>
    </form>
  )
}
