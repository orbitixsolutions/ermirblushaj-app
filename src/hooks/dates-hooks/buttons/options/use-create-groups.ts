import { useState } from 'react'
import { Team } from '@prisma/client'
import { toast } from 'sonner'
import { fetcher } from '@/helpers/fetcher'
import axios from 'axios'
import useSWR from 'swr'

const useCreateGroups = () => {
  const [isPending, setIsPending] = useState(false)

  const { data: getTeams } = useSWR<Team[]>('/api/teams', fetcher, {
    revalidateOnFocus: true
  })

  // Mezclamos el array de 20 equipos que llega como paramentro
  const mixArray = (array: Team[]) => {
    for (let i = array && array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const generateGroups = () => {
    setIsPending(true)
    let teams = Array.from({ length: 20 }, (_, i) => i + 1) as unknown as Team[]
    teams = mixArray(getTeams as Team[])

    let groups = []
    for (let i = 0; i < 4; i++) {
      const grupupName = String.fromCharCode(65 + i)

      let group = {
        groupName: grupupName,
        teams: teams.slice(i * 5, (i + 1) * 5)
      }
      groups.push(group)
    }

    return groups
  }

  const handleCreateGroups = async () => {
    const generatedGroups = generateGroups()

    const groupsPromises = generatedGroups.map((groups) =>
      axios.post('/api/groups', groups)
    )

    try {
      setIsPending(true)
      const responses = await Promise.all(groupsPromises)

      if (responses.every((response) => response.status === 200)) {
        toast.success('Groups have been created!')
      } else {
        toast.error('Not all groups could be created.')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.error || 'An error occurred'
        toast.error(errorMessage)
      } else {
        toast.error('An error occurred')
      }
    } finally {
      setIsPending(false)
    }
  }

  return { isPending, handleCreateGroups }
}

export default useCreateGroups
