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

  const fullGroups = data_groups?.length === 6

  // Mezclamos los equipos que son pasados como parametro
  const mixTeams = (team: Team[] | null | undefined): Team[] => {
    // Si es null un undefined retornamos un arreglo vacio
    if (!team || team.length <= 1) {
      return team || []
    }

    // Procede a mezclar el team como antes
    for (let i = team.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[team[i], team[j]] = [team[j], team[i]]
    }

    return team
  }

  // Generamos los grupos
  const generateGroups = () => {
    const mixedTeams = mixTeams(data_teams)

    const newGroups = Array.from({ length: 6 }, (_, i) => ({
      id: crypto.randomUUID(),
      name: String.fromCharCode(65 + i)
    }))

    for (let i = 0; i < mixedTeams.length; i++) {
      mixedTeams[i].groupId = newGroups[Math.floor(i / 2)].id
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
