import { selectFinalWinner } from '@/actions/services/edit'
import { MatchKey, Team } from '@prisma/client'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  Card,
  CardBody,
  Tooltip
} from '@nextui-org/react'
import { IconCheck, IconSettings } from '@tabler/icons-react'
import { mutate } from 'swr'
import FormMatchDate from '../form/form-match-date'
import { updatedData } from '@/helpers/updated-data'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}
const PopoverFinalsTeam = ({
  column,
  phase,
  match
}: {
  column: string
  phase: string
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

  const handleSelectWinner = (teamWinnerId: string) => {
    startTransition(async () => {
      const matchId = match.id
      const { status, message } = await selectFinalWinner(matchId, teamWinnerId)

      if (status === 200) {
        toast.success(message)
        updatedData()
        return
      }

      toast.error('An occurred error while selecting winner!')
      return
    })
  }

  if (match.matchStatus === 'FINISHED') return null

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

                  <div>
                    <h2 className='my-3 font-semibold text-center text-xl'>
                      Select winner
                    </h2>
                    <div className='flex gap-5'>
                      <Tooltip content={match.teamKeyA.name}>
                        <Card
                          isPressable
                          isDisabled={isPending}
                          onClick={() => handleSelectWinner(match.teamKeyA.id)}
                          className='bg-custom-darkblue'
                        >
                          <CardBody>
                            <Avatar src={match.teamKeyA.logo!} size='lg' />
                          </CardBody>
                        </Card>
                      </Tooltip>

                      <Tooltip content={match.teamKeyB.name}>
                        <Card
                          isPressable
                          isDisabled={isPending}
                          onClick={() => handleSelectWinner(match.teamKeyB.id)}
                          className='bg-custom-darkblue'
                        >
                          <CardBody>
                            <Avatar src={match.teamKeyB.logo!} size='lg' />
                          </CardBody>
                        </Card>
                      </Tooltip>
                    </div>
                  </div>
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
          <FormMatchDate column={column} phase={phase} match={match} setIsOpen={toggleOpen} />
        )}
      </PopoverContent>
    </Popover>
  )
}
export default PopoverFinalsTeam
