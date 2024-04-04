import { Group, Team } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'
import { fetcher } from '@/helpers/fetcher'
import { createMatches } from '@/actions/services/create'
import useSWR from 'swr'

type ExtendedGroup = Group & {
  teams: Team[]
}

const useCreateMatches = () => {
  const [isPending, setIsPending] = useState(false)
  const { data: getGroups } = useSWR<ExtendedGroup[]>('/api/groups', fetcher)

  const generateMatches = (group: ExtendedGroup) => {
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

    const allMatches = getGroups.map((group) => generateMatches(group))
    const tournamentMatchups = allMatches.flat()

    const matchupPromises = tournamentMatchups.map((match) => {
      const teamAId = match[0].id
      const teamBId = match[1].id
      return createMatches(teamAId, teamBId)
    })

    try {
      setIsPending(true)
      const responses = await Promise.all(matchupPromises)

      if (responses.every((response) => response.status === 200)) {
        return toast.success('Matches have been created!')
      }
      if (responses.every((response) => response.status === 409)) {
        return toast.error('Already exists matches created!')
      }
      if (responses.every((response) => response.status === 500)) {
        return toast.error('An ocurred a error!')
      }
    } finally {
      setIsPending(false)
    }
  }

  return { isPending, handleCreateMatches }
}

export default useCreateMatches
