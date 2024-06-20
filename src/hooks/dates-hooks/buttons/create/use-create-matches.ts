import { Group, Team } from '@prisma/client'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { fetcher } from '@/helpers/fetcher'
import { createMatches } from '@/actions/services/create'
import useSWR, { mutate } from 'swr'

type ExtendedGroup = Group & {
  teams: Team[]
}

const useCreateMatches = () => {
  const [isPendingMatches, startTransition] = useTransition()
  const { data: data_groups } = useSWR<ExtendedGroup[]>('/api/groups', fetcher)
  const { data: data_matches } = useSWR('/api/matches', fetcher)

  const MATCHES_LENGTH = data_matches?.length
  const DATA_GROUPS = data_groups?.length

  const fullMatches = MATCHES_LENGTH >= 6 && MATCHES_LENGTH % 2 === 0
  const emptyGroups = !data_groups || DATA_GROUPS === 0
  const emptyMatches = !data_matches || MATCHES_LENGTH === 0

  const generateMatches = (group: ExtendedGroup) => {
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
    if (emptyGroups) {
      return toast.error('There are not groups available!')
    }
    if (fullMatches) {
      return toast.error('Matches already created!')
    }

    startTransition(async () => {
      const allMatches = data_groups.map((group) => generateMatches(group))
      const tournamentMatchups = allMatches.flat()

      const matchupPromises = tournamentMatchups.map((match) => {
        const teamAId = match[0].id
        const teamBId = match[1].id
        return createMatches(teamAId, teamBId)
      })

      try {
        const responses = await Promise.all(matchupPromises)

        if (responses.every((response) => response.status === 200)) {
          toast.success('Matches have been created!')
          return
        }
        if (responses.every((response) => response.status === 409)) {
          toast.error('Already exists matches created!')
          return
        }
        if (responses.every((response) => response.status === 500)) {
          toast.error('An ocurred a error!')
          return
        }
      } finally {
        mutate('/api/matches')
      }
    })
  }

  return {
    emptyMatches,
    emptyGroups,
    fullMatches,
    isPendingMatches,
    handleCreateMatches
  }
}

export default useCreateMatches
