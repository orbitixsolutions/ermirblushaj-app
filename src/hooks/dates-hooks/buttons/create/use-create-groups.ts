import { useTransition } from 'react'
import { Match, Team } from '@prisma/client'
import { toast } from 'sonner'
import { fetcher } from '@/helpers/fetcher'
import { createGroups } from '@/actions/services/create'
import useSWR, { mutate } from 'swr'

const useCreateGroups = () => {
  const [isPendingGroups, startTransition] = useTransition()

  const { data: data_teams } = useSWR<Team[]>('/api/teams', fetcher)
  const { data: data_groups } = useSWR<Match[]>('/api/groups', fetcher)

  const fullGroups = (data_groups?.length ?? 0) >= 3

  const mixTeams = (team: Team[] | null | undefined): Team[] => {
    if (!team || team.length <= 1) {
      return team || []
    }

    for (let i = team.length - 1; i > 0; i--) {
      //Dejamos esta parte vacia (Sorteo de equipos)
    }
    
    return team
  }

  const generateGroups = () => {
    const mixedTeams = mixTeams(data_teams)

    const newGroups = Array.from({ length: 3 }, (_, i) => ({
      id: crypto.randomUUID(),
      name: String.fromCharCode(65 + i)
    }))

    for (let i = 0; i < mixedTeams.length; i++) {
      mixedTeams[i].groupId = newGroups[Math.floor(i / 5)].id
    }

    return { groups: newGroups, teams: mixedTeams }
  }

  // Creamos los grupos
  const handleCreateGroups = async () => {
    if (fullGroups) {
      return toast.error('Groups already created!')
    }

    startTransition(async () => {
      const data = generateGroups()

      const { status, message, error } = await createGroups(data)

      if (status === 200) {
        toast.success(message)
        mutate('/api/groups')
        return
      }

      toast.error(error)
    })
  }

  return { fullGroups, isPendingGroups, handleCreateGroups }
}

export default useCreateGroups
