import { useState } from 'react'
import { Group, Team } from '@prisma/client'
import { toast } from 'sonner'
import { fetcher } from '@/helpers/fetcher'
import { createGroups } from '@/actions/services/create'
import useSWR, { mutate } from 'swr'

type ExtendedGroup = Group & {
  teams: Team[]
}

const useCreateGroups = () => {
  const [isPending, setIsPending] = useState(false)

  const { data: getTeams } = useSWR<Team[]>('/api/teams', fetcher, {
    refreshInterval: 1000
  })

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
    setIsPending(true)

    // Mezclamos los equipos
    const mixedTeams = mixTeams(getTeams)

    // Generamos grupos nuevos con los equipos mezclados
    const newGroups = Array.from({ length: 4 }, (_, i) => ({
      name: String.fromCharCode(65 + i),
      teams: mixedTeams.slice(i * 5, (i + 1) * 5)
    }))

    setIsPending(false)
    return newGroups as ExtendedGroup[]
  }

  const handleCreateGroups = async () => {
    const generatedGroups = generateGroups()

    const groupsPromises = generatedGroups.map((groups) => createGroups(groups))

    try {
      setIsPending(true)
      const responses = await Promise.all(groupsPromises)

      if (responses.every((response) => response.status === 200)) {
        return toast.success('Groups have been created!')
      }
      if (responses.every((response) => response.status === 409)) {
        return toast.error('Already exists groups created!')
      }
      if (responses.every((response) => response.status === 500)) {
        return toast.error('An ocurred a error!')
      }
    } finally {
      mutate('/api/groups')
      setIsPending(false)
    }
  }

  return { isPending, handleCreateGroups }
}

export default useCreateGroups
