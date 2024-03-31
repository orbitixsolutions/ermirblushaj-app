import {
  deleteGroups,
  resetPlayerStats,
  resetTeamStats
} from '@/actions/services/delete'
import { fetcher } from '@/helpers/fetcher'
import { Match, Player, PlayerStats, Team, TeamStats } from '@prisma/client'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import useSWR from 'swr'

type ExtendedTeams = Team & {
  teamStats: TeamStats
  playerStats: PlayerStats[]
  players: Player[]
}

const useDeleteGroups = () => {
  const [isPending, setIsPending] = useState(false)

  const { data: getGroups } = useSWR<Match[]>('/api/groups', fetcher, {
    revalidateOnFocus: true
  })

  const { data: getStats } = useSWR<ExtendedTeams[]>(
    '/api/teams/full',
    fetcher,
    { revalidateOnFocus: true }
  )

  const handleDeleteGroups = async () => {
    if (!getGroups?.length) {
      setIsPending(false)
      return toast.error('There are not groups created!')
    }

    const sendPromisesGroups = getGroups?.map((group) => deleteGroups(group.id))

    const sendPromisesStats = getStats?.flatMap((stats) =>
      stats.players.map((player) => resetPlayerStats(player.id))
    )

    const allPromises = [
      ...sendPromisesGroups,
      ...(sendPromisesStats as any),
      ...(getStats?.map((stats) =>
        resetTeamStats(stats.teamStats.teamId)
      ) as any)
    ]

    try {
      setIsPending(true)
      const responses = await Promise.all(allPromises)
      const allSuccess = responses.every((response) => response.status === 200)

      if (allSuccess) {
        toast.success('All groups have been reset!')
      } else {
        toast.error('Some errors occurred while resetting groups.')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message)
      }
      toast.error('An error occurred!')
    } finally {
      setIsPending(false)
    }
  }

  return { isPending, handleDeleteGroups }
}

export default useDeleteGroups
