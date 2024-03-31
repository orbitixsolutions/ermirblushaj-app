import { Group, Team } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'
import { fetcher } from '@/helpers/fetcher'
import axios from 'axios'
import useSWR from 'swr'

type ExtenedGroup = Group & {
  teams: Team[]
}

const useCreateMatches = () => {
  const [isPending, setIsPending] = useState(false)

  const { data: getGroups } = useSWR<ExtenedGroup[]>('/api/groups', fetcher, {
    revalidateOnFocus: true
  })

  const generateMatches = (group: ExtenedGroup) => {
    setIsPending(true)
    const newGroups = group.teams

    let matchups = []
    for (let i = 0; i < newGroups.length; i++) {
      for (let j = i + 1; j < newGroups.length; j++) {
        matchups.push([newGroups[i], newGroups[j]])
      }
    }

    return matchups
  }

  const handleCreateMatches = async () => {
    if (!getGroups || getGroups.length === 0) {
      setIsPending(false)
      toast.error('There are not groups available!')
      return
    }

    const allMatchups = getGroups.map((group) => generateMatches(group))
    const tournamentMatchups = allMatchups.flat()

    const matchupPromises = tournamentMatchups.map((match) =>
      axios.post('/api/matches', {
        teamAId: match[0].id,
        teamBId: match[1].id
      })
    )

    try {
      setIsPending(true)
      const responses = await Promise.all(matchupPromises)

      if (responses.every((response) => response.status === 200)) {
        toast.success('All matches have been created!')
      } else {
        toast.error('Not all matches could be created.')
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

  return {isPending, handleCreateMatches}
}

export default useCreateMatches
