import { finishMatchFinal } from '@/actions/services/create'
import { fetcher } from '@/helpers/fetcher'
import { updatedData } from '@/helpers/updated-data'
import { Button } from '@nextui-org/react'
import { MatchKey, Team } from '@prisma/client'
import { useTransition } from 'react'
import { toast } from 'sonner'
import JSConfetti from 'js-confetti'
import useSWR from 'swr'

type ExtendedMatchKey = MatchKey & {
  teamKeyA: Team
  teamKeyB: Team
}

const ButtonFinalPhase = () => {
  const Confetti = new JSConfetti()
  const [isPending, startTransition] = useTransition()

  const { data: matchesKey } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys',
    fetcher
  )
  const { data: final_matches } = useSWR<ExtendedMatchKey[]>(
    '/api/matches/keys?phase=final&status=completed',
    fetcher
  )

  const FINAL = 1

  const status =
    (final_matches?.length ?? 0) === FINAL &&
    final_matches?.every((match) => match.status === 'COMPLETED')
  const finalPhase = matchesKey?.length === 15 && status

  const handleFinish = () => {
    startTransition(async () => {
      const { status, message } = await finishMatchFinal()
      if (status === 200) {
        toast.success(message)
        Confetti.addConfetti()
        updatedData()
        return
      }

      toast.error('An occurred error while finishing matches!')
      return
    })
  }

  if (!finalPhase) return
  return (
    <Button
      onPress={() => handleFinish()}
      isLoading={isPending}
      color='danger'
      fullWidth
      className='mx-auto bg-custom-blue font-bold'
    >
      Finish Final
    </Button>
  )
}

export default ButtonFinalPhase
