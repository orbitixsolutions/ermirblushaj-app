import { useTransition } from 'react'
import { Group, Match, Team } from '@prisma/client'
import { toast } from 'sonner'
import { fetcher } from '@/helpers/fetcher'
import { createGroups } from '@/actions/services/create'
import useSWR, { mutate } from 'swr'

type ExtendedGroup = Group & {
  teams: Team[]
}

const useCreateGroups = () => {
  const [isPendingGroups, startTransition] = useTransition()

  const { data: data_teams } = useSWR<Team[]>('/api/teams', fetcher)
  const { data: data_groups } = useSWR<Match[]>('/api/groups', fetcher)

  const fullGroups = data_groups?.length === 4

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

    const newGroups = Array.from({ length: 4 }, (_, i) => ({
      name: String.fromCharCode(65 + i),
      teams: mixedTeams.slice(i * 5, (i + 1) * 5)
    }))
    return newGroups as ExtendedGroup[]
  }

  // Creamos los grupos
  const handleCreateGroups = async () => {
    if (fullGroups) {
      return toast.error('Groups already created!')
    }

    startTransition(async () => {
      const generatedGroups = generateGroups()
      const groupsPromises = generatedGroups.map((groups) =>
        createGroups(groups)
      )

      try {
        const responses = await Promise.all(groupsPromises)

        if (responses.every((response) => response.status === 200)) {
          toast.success('Groups have been created!')
          return
        }

        if (responses.every((response) => response.status === 409)) {
          toast.error('Already exists groups created!')
          return
        }

        if (responses.every((response) => response.status === 500)) {
          toast.error('An ocurred a error!')
          return
        }
      } finally {
        mutate('/api/groups')
      }
    })
  }

  return { fullGroups, isPendingGroups, handleCreateGroups }
}

export default useCreateGroups
